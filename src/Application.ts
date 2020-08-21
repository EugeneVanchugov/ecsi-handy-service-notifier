import express = require("express");
import log from "./config/LoggerConfig";
import { Controller } from "./controller/Controller.interface";

export class Application {
	public app: express.Application;

	constructor(controllers: Controller[]) {
		this.app = express();

		this.initMidleware();
		this.initControllers(controllers);
	}

	private initMidleware() {
		this.app.use(express.json());
	}

	private initControllers(controllers: Controller[]) {
		controllers.forEach((controller) => {
			this.app.use(controller.router);
		});
	}

	public listen() {
		this.app.listen(process.env.APP_PORT, () => {
			log.info(`App listening on port ${process.env.APP_PORT}`);
		});
	}
}

export default Application;
