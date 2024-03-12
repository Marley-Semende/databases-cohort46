const setAccounts = require("./setup");
const transfer = require("./transaction");

async function main() {
  try {
    await setAccounts();

    //transfer 1k from acc 101 to acc 102
    await transfer(
      101,
      102,
      1000,
      "Transferring 1k from account 101 to account 102"
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
