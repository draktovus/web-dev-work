const data = require('../data/biometrics.json')
const { connect, ObjectId } = require("./mongo");

const COLLECTION_NAME = "biometrics";

async function collection(){
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

async function getAll(page=1, pageSize=30){
    const col = await collection();
    const items = await col.find().skip((page-1) * pageSize).limit(pageSize).toArray();
    const total = await col.countDocuments()
    return {items, total};
}

async function getById(id){
    const col = await collection();
    const biometric = await col.findOne({ userId: id });
    return biometric
}

async function add(item){
    const col = await collection();
    const biometric = await col.insertOne(item);
    item._id = biometric.insertedId;
    return biometric;
}

async function update(item){
    const col = await collection();
    const result = await col.findOneAndUpdate(
        { _id: item._id },
        { $set: item },
        { returnDocument: "after" }
      );
    return result.value
}

async function deleteItem(item){
    const col = await collection();
    const result = await col.deleteOne({ _id: item._id });
    return result.deletedCount;
}

async function search(searchTerm, page = 1, pageSize = 30) {
    const col = await collection();
    // option 'i' is case insensitive
    const query = {
      $or: [
        { gender: { $regex: searchTerm, $options: "i" } },
        { dateOfBirth: { $regex: searchTerm, $options: "i" } },
        { userId: { $regex: searchTerm, $options: "i" } },
      ],
    };
    const items = await col
      .find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    const total = await col.countDocuments(query);
    return { items, total };
  }
module.exports = {
    getAll,
    getById,
    add,
    update,
    deleteItem,
    search
}