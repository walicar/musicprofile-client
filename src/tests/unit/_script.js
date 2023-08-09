const childProcess = require("child_process");
var tests = ['src/tests/unit/NavBar.tsx']
const command = `npm test ${tests.join(" ")}`;
childProcess.execSync(command, { stdio: "inherit" });
