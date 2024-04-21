const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

async function getInfoByYearAge(year, age) {
  const client = new MongoClient(process.env.URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    const db = client.db("databaseWeek4");
    const collection = db.collection("populationPyramid");

    //filter for year , age
    const pipeline = [
      {
        $match: {
          Year: year,
          Age: age,
          Country: { $regex: /^[A-Z\s]+$/ },
        },
      },
      {
        $addFields: {
          TotalPopulation: { $add: ["$M", "$F"] },
        },
      },
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

getInfoByYearAge(1950, "95-99");
