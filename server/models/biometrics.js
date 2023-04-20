const data = require('../data/biometrics.json')
const { connect, ObjectId } = require("./mongo");

const COLLECTION_NAME = "biometrics";

async function collection(){
    const db = await connect();
    return db.collection(COLLECTION_NAME);
}

async function getAllBiometrics(){
    const col = await collection();
    const biometrics = await col.find().toArray();
    return biometrics;
}

async function getBiometricById(id){
    const col = await collection();
    const biometric = await col.findOne({ userId: id });
    return biometric
}

async function addBiometric(biometricData){
    const col = await collection();
    const biometric = await col.insertOne(biometricData);
    return biometric;
}

async function updateBiometric(biometricData){
    const col = await collection();
    const biometric = await col.findOneAndUpdate({ _id: biometricData._id }, biometricData);
    return biometric
}

async function deleteBiometric(biometric){
    const col = await collection();
    const bio = await col.findOneAndDelete({ _id: biometric._id });
    return bio
}

async function searchBiometric(searchTerm){
    const col = await collection();
    const pipeline = [
    {
        $search: {
            text: {
                query: searchTerm,
                path: {
                  wildcard: "*",
                },
            },
        }
    }
    ]
    const biometrics = await col.aggregate(pipeline).toArray();
    return biometrics
}
module.exports = {
    getAllBiometrics,
    getBiometricById,
    addBiometric,
    updateBiometric,
    deleteBiometric,
    searchBiometric
}