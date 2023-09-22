require('dotenv').config();
const {scanWholeTable, putDynamo, getDynamo, deleteDynamo} = require("./dynamo-utils");
const ORG_SERVICE_TABLE = process.env.ORG_SERVICE_TABLE

const getAllOrgServiceInfo = async () => {
    const input = {
        "TableName": ORG_SERVICE_TABLE,
    }
    return await scanWholeTable(input)
}


const getOrgServiceById = async (id) => {
    const input = {
        TableName: ORG_SERVICE_TABLE, Key: {
            SERVICE_ID: Number.parseInt(id)
        }
    }
    return await getDynamo(input);
};


const putOrgService = async (data) => {
    const input = {
        TableName: ORG_SERVICE_TABLE, Item: data
    }
    return await putDynamo(input);
};


const deleteOrgService = async (id) => {
    const input = {
        TableName: ORG_SERVICE_TABLE, Key: {
            SERVICE_ID: id
        },
    }

    return await deleteDynamo(input);
};


module.exports = {getAllOrgServiceInfo, getOrgServiceById, putOrgService, deleteOrgService}