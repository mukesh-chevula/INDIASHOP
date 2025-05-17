import { MongoClient } from "mongodb";
async function renameDatabase(oldDbName, newDbName) {
  const url =
    "mongodb+srv://mukeshchevula:beI2ZQbqRjR6B5Xr@cluster0.gzrodpp.mongodb.net?retryWrites=true&w=majority&appName=Cluster0"; // Adjust your MongoDB connection URL
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const oldDb = client.db("IndiaShop");
    const newDb = client.db("DB");

    // Get the list of collections in the old database
    const collections = await oldDb.listCollections().toArray();

    // Copy each collection to the new database
    for (let collection of collections) {
      const oldCollection = oldDb.collection(collection.name);
      const newCollection = newDb.collection(collection.name);

      // Copy all documents from the old collection to the new collection
      const documents = await oldCollection.find().toArray();
      if (documents.length > 0) {
        await newCollection.insertMany(documents);
      }
    }

    // Drop the old database (after verifying everything is copied)
    await oldDb.dropDatabase();
    console.log("Database renamed successfully!");
  } catch (error) {
    console.error("Error renaming database:", error);
  } finally {
    await client.close();
  }
}

renameDatabase("oldDatabaseName", "newDatabaseName");
