const data = require('../data/biometrics.json')

function getAllBiometrics(){
    return data.biometrics;
}

function getBiometricById(id){
    return data.biometrics.find(entry => entry.userId === id);
}

function addBiometric(biometricData){
    biometricData.key = data.biometrics.length + 1
    data.biometrics.push(biometricData)
}

function updateBiometric(biometricData){
    const index = data.biometrics.findIndex(entry => entry.userId === biometricData.userId);
    data.biometrics[index] = biometricData;
}

function deleteBiometric(biometric){
    const index = data.biometrics.findIndex(entry => entry.userId === biometric.userId);
    data.biometrics.splice(index, 1);
}

function searchBiometric(searchTerm){
}
module.exports = {
    getAllBiometrics,
    getBiometricById,
    addBiometric,
    updateBiometric,
    deleteBiometric,
}