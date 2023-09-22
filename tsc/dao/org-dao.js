require('dotenv').config();
const {scanWholeTable, putDynamo, getDynamo, deleteDynamo} = require("./dynamo-utils");
const ORGANIZATION_TABLE = process.env.ORGANIZATION_TABLE

const getAllOrgInfo = async () => {
    const input = {
        "TableName": ORGANIZATION_TABLE,
        // "FilterExpression": "#n0 = :v0"        ,
        // "ExpressionAttributeNames": {"#n0": a},
        // "ExpressionAttributeValues": {":v0" : false},
        // "ProjectionExpression": "JOIN_DATE,PERMANENT_DATE"
    }
    return await scanWholeTable(input)
}


const getOrgById = async (id) => {
    const input = {
        TableName: ORGANIZATION_TABLE,
        Key: {
            ORG_ID: Number.parseInt(id)
        }
    }
    return await getDynamo(input);
};


const putOrg = async (data) => {
    const input = {
        TableName: ORGANIZATION_TABLE,
        Item: data
    }

    return await putDynamo(input);
};


const deleteOrg = async (id) => {
    const input = {
        TableName: ORGANIZATION_TABLE,
        Key: {
            ORG_ID: id
        },
    }
    return await deleteDynamo(input);
};


module.exports = {getAllOrgInfo, getOrgById, putOrg, deleteOrg}