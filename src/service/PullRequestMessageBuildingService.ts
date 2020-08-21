import Mustache from "mustache";
import log from "../config/LoggerConfig";
import { pullRequestEventKeyMapper } from "../domain/TemplateMappings";
import { PullRequestObject } from "../domain/PullRequest";
import { pullRequestTemplate } from "../domain/MessageTemplates";

export class PullRequestMessageBuildingService {
	public buildPullRequestMessage(inputBody: PullRequestObject) {
		log.info(`Building body from: ${JSON.stringify(inputBody, null, "  ")}`);
		log.info(`Message template: ${pullRequestTemplate}`);

		inputBody.eventKeyMapper = pullRequestEventKeyMapper;

		let slackMessage = Mustache.render(pullRequestTemplate, inputBody);

		log.info(`Slack message: ${slackMessage}`);

		return JSON.parse(slackMessage);
	}
}

export default PullRequestMessageBuildingService;
