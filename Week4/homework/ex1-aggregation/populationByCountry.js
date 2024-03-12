const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

async function getPopulationByYear(country) {
  const client = new MongoClient(process.env.URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    const db = client.db("databaseWeek4");
    const collection = db.collection("populationPyramid");

    const pipeline = [
      { $match: { Country: country } },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } },
        },
      },
      { $sort: { _id: 1 } },
    ];
    const results = await collection.aggregate(pipeline).toArray();
    console.log(results);
    return results;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}
getPopulationByYear("Zimbabwe");
