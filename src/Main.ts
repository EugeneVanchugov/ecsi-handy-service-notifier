import "dotenv/config";
import express = require("express");
import { Application } from "./Application";
import SandboxController from "./controller/SandboxController";
import PullRequestController from "./controller/PullRequestController";

const app = new Application([
	new PullRequestController(),
	new SandboxController(),
]);

app.listen();
