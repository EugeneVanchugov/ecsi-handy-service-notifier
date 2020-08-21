import fs from "fs";
import rimraf from "rimraf";
import Mustache from "mustache";
import log from "../config/LoggerConfig";
import yamlConverter = require("js-yaml");
import { Sandbox } from "../domain/SandboxObject";
import { PushObject } from "../domain/PushObject";
import { sandboxTemplate } from "../domain/MessageTemplates";
import { sandboxColorMapper } from "../domain/TemplateMappings";
import { Clone, CloneOptions, Cred, Commit, Repository } from "nodegit";

export class SandboxMessageBuildingService {
	clonePath: string;
	repositoryUrl: string;
	filesToProcess: any;
	cloneOptions: CloneOptions;

	constructor() {
		this.clonePath = "../test-clone";
		this.repositoryUrl = process.env.GIT_REPOSITORY || "";

		this.filesToProcess = <JSON>(<unknown>{
			currentSandbox: "current_sandbox.txt",
			standParams: "current_stand_params.yaml",
			version: "current_version.txt",
			vms: "current_vms.yaml",
		});

		this.cloneOptions = {};
		this.cloneOptions.fetchOpts = {
			callbacks: {
				certificateCheck: function () {
					return 1;
				},
				credentials: function () {
					return Cred.userpassPlaintextNew(
						process.env.GIT_USERNAME || "",
						process.env.GIT_PASSWORD || ""
					);
				},
			},
		};
	}

	public async buildSandboxMessage(pushObject: PushObject) {
		if (fs.existsSync(this.clonePath)) {
			rimraf.sync(this.clonePath);
		}

		log.info(`Getting repository. URL: ${this.repositoryUrl}`);

		let repository: Promise<Repository> = Clone.clone(
			this.repositoryUrl,
			this.clonePath,
			this.cloneOptions
		);

		let slackMessage: Promise<string> = repository
			.then((repo) => this.getCommitByHash(pushObject, repo))
			.then((commit) => this.buildSandboxObject(this.filesToProcess, commit))
			.then((sandbox) => this.renderSlackMessage(sandbox));

		return slackMessage;
	}

	private async getCommitByHash(
		pushObject: PushObject,
		repo: Repository
	): Promise<Commit> {
		let commitHash = pushObject.changes[0].toHash;
		let branchName = pushObject.changes[0].ref.displayId;

		log.info(`Switching to branch: ${branchName}`);

		repo.checkoutBranch(branchName);

		log.info(`Getting commit by hash: ${commitHash}`);

		return repo.getCommit(commitHash);
	}

	private async buildSandboxObject(
		sandboxObjectTemplate: any,
		commit: Commit
	): Promise<Sandbox> {
		for (let [entryName, fileName] of Object.entries(sandboxObjectTemplate)) {
			sandboxObjectTemplate[entryName] = await commit
				.getEntry(<string>fileName)
				.then((entry) => entry.getBlob())
				.then((blob) => this.convertYamlToJson(blob));
		}
		return sandboxObjectTemplate;
	}

	private renderSlackMessage(sandbox: Sandbox) {
		sandbox.currentSandboxMapper = sandboxColorMapper;
		let slackMessage: string = Mustache.render(sandboxTemplate, sandbox);
		log.info(`Sandbox slack message: ${slackMessage}`);

		return slackMessage;
	}

	private convertYamlToJson(blob: any) {
		return yamlConverter.load(String(blob));
	}
}

export default SandboxMessageBuildingService;
