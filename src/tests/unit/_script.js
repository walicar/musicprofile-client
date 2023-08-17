const childProcess = require("child_process");
var tests = [
  "src/tests/unit/NavBar.test.tsx",
  "src/tests/unit/FetchStub.test.tsx",
];
const command = `npx vitest ${tests.join(" ")}`;
childProcess.execSync(command, { stdio: "inherit" });
