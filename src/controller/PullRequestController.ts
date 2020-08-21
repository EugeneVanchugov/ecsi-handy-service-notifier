import axios from "axios";
import express = require("express");
import log from "../config/LoggerConfig";
import { Controller } from "./Controller.interface";
import { PullRequestMessageBuildingService } from "../service/PullRequestMessageBuildingService";

export class PullRequestController implements Controller {
	path: string;
	router: express.Router;
	slackWebhookUrl: string;
	messageBuildingService: PullRequestMessageBuildingService;

	constructor() {
		this.path = "/pr";
		this.router = express.Router();

		this.router.post(this.path, this.processPullRequest);
		this.messageBuildingService = new PullRequestMessageBuildingService();
		this.slackWebhookUrl = process.env.SLACK_PR_WEBHOOK_URL || "";
	}

	private processPullRequest = (
		request: express.Request,
		out: express.Response
	) => {
		axios
			.post(
				this.slackWebhookUrl,
				this.messageBuildingService.buildPullRequestMessage(request.body)
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

export default PullRequestController;
