export const pullRequestTemplate = `{
	"text": "{{#eventKeyMapper}}{{eventKey}}{{/eventKeyMapper}}",
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "{{#eventKeyMapper}}{{eventKey}}{{/eventKeyMapper}}",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "👤 *Author:* {{pullRequest.author.user.name}}\\n🗄 *Project name:* {{pullRequest.fromRef.repository.project.key}}\\n📂 *Repository name:* {{pullRequest.fromRef.repository.name}}\\n📝 *PR Name:* {{pullRequest.title}}\\n*From branch * \`{{pullRequest.fromRef.displayId}}\` ➡️ \`{{pullRequest.toRef.displayId}}\`\\n<https://stash.billing.ru/projects/{{pullRequest.fromRef.repository.project.key}}/repos/{{pullRequest.fromRef.repository.name}}/pull-requests/{{pullRequest.id}}/overview|*---Link to PR---*>"
			},
			"accessory": {
				"type": "image",
				"image_url": "https://store-images.s-microsoft.com/image/apps.8941.71abce6a-be0d-4016-b6c6-c316d70940d7.84f97468-8802-4c97-9d34-1c8b04af5ec7.2eb89e82-2a44-44e5-85c7-95794e890782.png",
				"alt_text": "bitbucket_icon"
			}
		},
		{
			"type": "divider"
		}
	]
}`;

export const sandboxTemplate = `{
    "text": ":package: NEW SANDBOX PARAMETERS HAS ARRIVED!",
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": ":package: NEW SANDBOX PARAMETERS HAS ARRIVED!",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"fields": [
				{
					"type": "mrkdwn",
					"text": "*Current sandbox:* \n{{#currentSandboxMapper}}{{currentSandbox}}{{/currentSandboxMapper}}"
				},
				{
					"type": "mrkdwn",
					"text": "*Current version:* \n{{version}}"
				}
			]
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*VMs:*"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "\`\`\`application: \n{{#vms.vms.application}}\t-{{.}}\n{{/vms.vms.application}} \ndatabase: \n{{#vms.vms.database}}\t-{{.}}\n{{/vms.vms.database}} \nopenapi: \n{{#vms.vms.openapi}}\t-{{.}}\n{{/vms.vms.openapi}} \noracle: \n{{#vms.vms.oracle}}\t-{{.}}\n{{/vms.vms.oracle}} \nelasticsearch: \n{{#vms.vms.elasticsearch}}\t-{{.}}\n{{/vms.vms.elasticsearch}} \nelastic-csi: \n{{#vms.vms.elastic-csi}}\t-{{.}}\n{{/vms.vms.elastic-csi}} \noracle-csi: \n{{#vms.vms.oracle-csi}}\t-{{.}}\n{{/vms.vms.oracle-csi}} \nproxy: \n{{#vms.vms.proxy}}\t-{{.}}\n{{/vms.vms.proxy}} \nkafka: \n{{#vms.vms.kafka}}\t-{{.}}\n{{/vms.vms.kafka}} \nbis: \n{{#vms.vms.bis}}\t-{{.}}\n{{/vms.vms.bis}} \nexporter: \n{{#vms.vms.exporter}}\t-{{.}}\n{{/vms.vms.exporter}} \npostgresql: \n{{#vms.vms.postgresql}}\t-{{.}}\n{{/vms.vms.postgresql}}\`\`\`"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*STAND PARAMS:*"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "\`\`\`csi_schema_username:\t{{standParams.parameters.csi.csi_schema_username}},\ncsi_schema_password:\t{{standParams.parameters.csi.csi_schema_password}},\ncsi_exporter_schema_username:\t{{standParams.parameters.csi.csi_exporter_schema_username}},\ncsi_exporter_schema_password:\t{{standParams.parameters.csi.csi_exporter_schema_password}},\ncsi_sender_schema_username:\t{{standParams.parameters.csi.csi_sender_schema_username}},\ncsi_sender_schema_password:\t{{standParams.parameters.csi.csi_sender_schema_password}},\ncsi_sync_schema_username:\t{{standParams.parameters.csi.csi_sync_schema_username}},\nelastic_schema_prefix:\t{{standParams.parameters.csi.elastic_schema_prefix}},\nelastic_schema_suffix:\t{{standParams.parameters.csi.elastic_schema_suffix}}\`\`\`"
			}
		}
	]
}`;
