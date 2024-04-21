const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

//mongo client
const client = new MongoClient(process.env.URI);

async function transfer(
  senderAccountNumber,
  receiverAccountNumber,
  amount,
  remark
) {
  try {
    if (!client.isConnected()) {
      await client.connect();
      console.log("Connected to MongoDB successfully!");
    }

    const session = client.startSession();
    session.startTransaction();

    const db = client.db("transactionsDB");
    const collection = db.collection("accounts");

    //find acc
    const sender = await collection.findOne({
      account_number: senderAccountNumber,
    });
    const receiver = await collection.findOne({
      account_number: receiverAccountNumber,
    });

    if (!sender || !receiver) {
      console.log("Account not found.");
      return;
    }

    // calc change
    const senderChangeNumber =
      sender.account_changes.length > 0
        ? sender.account_changes[sender.account_changes.length - 1]
            .change_number + 1
        : 1;
    const receiverChangeNumber =
      receiver.account_changes.length > 0
        ? receiver.account_changes[receiver.account_changes.length - 1]
            .change_number + 1
        : 1;

    //update balances&add changes to acc_changes array
    await collection.updateOne(
      { account_number: senderAccountNumber },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: senderChangeNumber,
            amount: -amount,
            changed_date: new Date(),
            remark,
          },
        },
      }
    );

    await collection.updateOne(
      { account_number: receiverAccountNumber },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: receiverChangeNumber,
            amount,
            changed_date: new Date(),
            remark,
          },
        },
      },
      { session }
    );

    await session.commitTransaction();
    console.log(
      `Transfer of ${amount} from account ${senderAccountNumber} to account ${receiverAccountNumber} was successful!`
    );
  } catch (err) {
    console.error("Error:", err);
    await session.abortTransaction();
  } finally {
    session.endSession();
    await client.close();
  }
}

module.exports = transfer;
