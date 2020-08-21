import axios from "axios";
import express = require("express");
import log from "../config/LoggerConfig";
import { Controller } from "./Controller.interface";
import { SandboxMessageBuildingService } from "../service/SandboxMessageBuildingService";

export class SandboxController implements Controller {
	path: string;
	router: express.Router;
	slackWebhookUrl: string;
	messageBuildingService: SandboxMessageBuildingService;

	constructor() {
		this.path = "/sandbox";
		this.router = express.Router();

		this.router.post(this.path, this.processSandboxMessage);
		this.messageBuildingService = new SandboxMessageBuildingService();
		this.slackWebhookUrl = process.env.SLACK_SANDBOX_WEBHOOK_URL || "";
	}

	private processSandboxMessage = async (
		request: express.Request,
		out: express.Response
	) => {
		axios
			.post(
				this.slackWebhookUrl,
				await this.messageBuildingService.buildSandboxMessage(request.body)
			)
			.then(function (response) {
				log.info("OK");
				out.send("OK");
			})
			.catch(function (error) {
				log.error(error);
				out.send(error);
			});
	};
}

export default SandboxController;
