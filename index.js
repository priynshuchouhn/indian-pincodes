const fs = require('fs');
const pincodeData = require('./data/pincodes.json');

const index = {
    name: {},
    district: {},
    state: {}
};

pincodeData.forEach(entry => {
    // Index by name
    const nameKey = entry.name.toLowerCase();
    if (!index.name[nameKey]) {
        index.name[nameKey] = [];
    }
    index.name[nameKey].push(entry);

    // Index by district
    const districtKey = entry.district.toLowerCase();
    if (!index.district[districtKey]) {
        index.district[districtKey] = [];
    }
    index.district[districtKey].push(entry);

    // Index by state
    const stateKey = entry.state.toLowerCase();
    if (!index.state[stateKey]) {
        index.state[stateKey] = [];
    }
    index.state[stateKey].push(entry);
});

fs.writeFileSync('./data/index.json', JSON.stringify(index));

// Functions

function getPincodeDetails(pincode) {
    return pincodeData.find(entry => entry.pincode === pincode);
}

function getPincodesByDistrict(district) {
    return pincodeData.filter(entry => entry.district.toLowerCase() === district.toLowerCase());
}

function getPincodesByState(state) {
    return pincodeData.filter(entry => entry.state.toLowerCase() === state.toLowerCase());
}

function getDistrictsByState(state) {
    const districts = pincodeData
        .filter(entry => entry.state.toLowerCase() === state.toLowerCase())
        .map(entry => entry.district);
    return [...new Set(districts)]; // Remove duplicates
}

function getStates() {
    const states = pincodeData.map(entry => entry.state);
    return [...new Set(states)]; // Remove duplicates
}

function searchPincodes(query) {
    const lowerCaseQuery = query.toLowerCase();
    let results = [];

    if (index.name[lowerCaseQuery]) {
        results = results.concat(index.name[lowerCaseQuery]);
    }
    if (index.district[lowerCaseQuery]) {
        results = results.concat(index.district[lowerCaseQuery]);
    }
    if (index.state[lowerCaseQuery]) {
        results = results.concat(index.state[lowerCaseQuery]);
    }

    return results;
}

function getAllPincodes() {
    return pincodeData;
}

module.exports = {
    getPincodeDetails,
    getPincodesByDistrict,
    getPincodesByState,
    getDistrictsByState,
    getStates,
    searchPincodes,
    getAllPincodes
};
