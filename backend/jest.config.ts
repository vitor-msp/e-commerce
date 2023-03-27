export default {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts", "!**/*.test.ts"],
  coverageDirectory: "test/coverage",
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: ["**/**/*.test.ts?(x)"],
};
