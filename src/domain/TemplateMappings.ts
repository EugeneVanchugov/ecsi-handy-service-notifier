export type PropertyMapper = () => (property: string, render: any) => string;

export function pullRequestEventKeyMapper() {
	return function (eventKey: string, render: any) {
		let renderedEventKey: string = render(eventKey);
		switch (renderedEventKey) {
			case "pr:opened":
				return "💥 NEW PR OPENED! 💥";

			case "pr:merged":
				return "🌟 Pull Request was MERGED! 🌟";

			case "pr:deleted":
			case "pr:declined":
				return "❌ Pull Request was declined or deleted. ❌";

			default:
				return `❕ Changes in Stash. Event key: ${renderedEventKey} ❕`;
		}
	};
}

export function sandboxColorMapper() {
	return function (color: string, render: any) {
		let renderedColor = render(color);

		switch (renderedColor) {
			case "blue":
				return ":large_blue_circle: blue";

			case "green":
				return ":green_apple: green";

			default:
				return ":squirrel: what color is it????";
		}
	};
}
