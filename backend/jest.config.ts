export default {
  bail: 1,
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["**/*.ts", "!**/*.test.ts"],
  coverageDirectory: "test/coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ["**/**/*.test.ts?(x)"],
};
