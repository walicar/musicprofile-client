const childProcess = require("child_process");

// Execute the test runner with the specified test files

var testsSequential = [
  "src/tests/integration/auth.test.tsx",
  "src/tests/integration/tokensSlice.test.tsx",
];

var testsParallel = ["src/tests/integration/stub.test.tsx"];

const sequentialRun = () => {
  const command = `npm test ${testsSequential.join(" ")} --runInBand`;
  childProcess.execSync(command, { stdio: "inherit" });
};

const parallelRun = () => {
  const command = `npm test ${testsParallel.join(" ")}`;
  childProcess.execSync(command, { stdio: "inherit" });
};

const allRun = () => {
  const command = `npm test --watchAll=false ${testsSequential.join(
    " ",
  )} ${testsParallel.join()}`;
  childProcess.execSync(command, {
    stdio: "inherit",
  });
};

const help = () => {
  console.log(
    "--------------------------------------\nINTEGRATION TESTS - flags available:\n--------------------------------------\n'-s' for sequential run\n'-p' for parallel run\n'-a' for all run, is the default command\n'-h' for help menu",
  );
};

const commandBuilder = {
  "-s": sequentialRun,
  "-p": parallelRun,
  "-a": allRun,
  "-h": help,
};

const flag = process.argv[2];
if (!flag) {
  allRun();
} else {
  const run = commandBuilder[flag];
  if (run) {
    run();
  } else {
    help();
  }
}
