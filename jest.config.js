module.exports = {
	testEnvironment: 'jest-environment-jsdom-thirteen',
	clearMocks: true,
	bail: false,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: [
		'/node_modules/'
	],
	coverageProvider: 'v8',
	coverageReporters: [
		'json',
		'text',
		'lcov',
		'clover'
	],
	globals: {
		'ts-jest': {
			stringifyContentPathRegex: '\\.html$',
			tsconfig: 'tsconfig.json',
			allowSyntheticDefaultImports: true,
			astTransformers: {
				before: [
				  'jest-preset-angular/build/InlineFilesTransformer',
				  'jest-preset-angular/build/StripStylesTransformer',
				],
			},
			diagnostics: {
				ignoreCodes: [151001]
			}
		},
	},
	roots: ['<rootDir>/src'],
	moduleFileExtensions: ['ts', 'html', 'js', 'json'],
	setupFilesAfterEnv: [
		'<rootDir>/setupJest.ts'
	],
	testMatch: [
		'**/**/*.spec.ts',
	],
	transformIgnorePatterns: [
		"node_modules/(?!@ngrx|ngx-auto-unsubscribe|lodash)"
	],
	transform: {
		"^.+\\.(ts|js|html)$": "ts-jest",
		"^.+\\.js$": "babel-jest"
	}
};
