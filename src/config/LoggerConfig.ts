import winston = require("winston");

const log = winston.createLogger({
	level: "info",
	transports: [
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
	],
});

export default log;
