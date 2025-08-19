export default {
	branches: ["main"],
	plugins: [
		[
			"@semantic-release/commit-analyzer",
			{
				preset: "conventionalcommits",
				releaseRules: [
					{ release: "minor", type: "feat" },
					{ release: "patch", type: "fix" },
					{ release: "patch", type: "perf" },
					{ release: "patch", type: "docs" },
					{ release: "patch", type: "style" },
					{ release: "patch", type: "refactor" },
					{ release: "patch", type: "test" },
					{ release: "patch", type: "chore" },
				],
			},
		],
		[
			"@semantic-release/release-notes-generator",
			{
				preset: "conventionalcommits",
				presetConfig: {
					types: [
						{ section: "✨ Features", type: "feat" },
						{ section: "🐛 Bug Fixes", type: "fix" },
						{
							section: "⚡ Performance Improvements",
							type: "perf",
						},
						{ section: "⏪ Reverts", type: "revert" },
						{
							hidden: true,
							section: "📚 Documentation",
							type: "docs",
						},
						{ hidden: true, section: "💎 Styles", type: "style" },
						{
							hidden: true,
							section: "🔧 Miscellaneous Chores",
							type: "chore",
						},
						{
							hidden: true,
							section: "📦 Code Refactoring",
							type: "refactor",
						},
						{ hidden: true, section: "🚨 Tests", type: "test" },
						{ hidden: true, section: "🛠 Builds", type: "build" },
						{
							hidden: true,
							section: "⚙️ Continuous Integrations",
							type: "ci",
						},
					],
				},
				writerOpts: {
					commitGroupsSort: "title",
					commitsSort: ["scope", "subject"],
					groupBy: "type",
				},
			},
		],
		"@semantic-release/changelog",
		"@semantic-release/github",
	],
};
