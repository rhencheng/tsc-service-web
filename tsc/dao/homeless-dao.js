require('dotenv').config();
const {scanWholeTable, putDynamo, getDynamo, deleteDynamo, updateDynamo, genExpression} = require("./dynamo-utils");
const HOMELESS_TABLE = process.env.HOMELESS_TABLE

const getHomelessById = async (id) => {
    const input = {
        TableName: HOMELESS_TABLE,
        Key: {
            HOMELESS_ID: id
        }
    }
    return await getDynamo(input);
};

const putHomeless = async (data) => {

    // homelessId, attName, attValue
    const res = await genExpression(data, "HOMELESS_ID")
    const input = {
        TableName: HOMELESS_TABLE,
        Key: {
            HOMELESS_ID: data.HOMELESS_ID,
        },
        UpdateExpression: res.updateExpression,
        ExpressionAttributeNames: res.expressionAttributeNames,
        ExpressionAttributeValues: res.expressionAttributeValues,
        ReturnValues: "ALL_NEW",
    };
    // const input = {
    //     TableName: HOMELESS_TABLE,
    //     Key: {
    //         HOMELESS_ID: homelessId,
    //     },
    //     UpdateExpression: "set #n0 = :v0,#n1 = :v1",
    //     ExpressionAttributeNames: {"#n0": attName, "#n1": attName + "1"},
    //     ExpressionAttributeValues: {
    //         ":v0": attValue, ":v1": attValue + 2,
    //     },
    //     ReturnValues: "ALL_NEW",
    // };
    return await updateDynamo(input);
};


const deleteHomeless = async (id) => {
    const input = {
        TableName: HOMELESS_TABLE,
        Key: {
            HOMELESS_ID: id
        },
    }

    return await deleteDynamo(input);
};

const scanHomelessByOrgId = async (orgId) => {
    const input = {
        "TableName": HOMELESS_TABLE,
        "FilterExpression": "#n0 = :v0",
        "ExpressionAttributeNames": {"#n0": "ORG" + orgId},
        "ExpressionAttributeValues": {":v0": true},
        // "ProjectionExpression": "JOIN_DATE,PERMANENT_DATE"
    }
    return await scanWholeTable(input)
}


const getAllHomeless = async () => {
    const input = {
        "TableName": HOMELESS_TABLE,
        // "FilterExpression": "#n0 = :v0"        ,
        // "ExpressionAttributeNames": {"#n0": a},
        // "ExpressionAttributeValues": {":v0" : false},
        // "ProjectionExpression": "JOIN_DATE,PERMANENT_DATE"
    }
    return await scanWholeTable(input)
}


const inertComment = async (comment) => {
    const input = {
        TableName: HOMELESS_TABLE,
        Key: {
            HOMELESS_ID: "homeless_1"
        },

        UpdateExpression: "SET #a = list_append(#a, :new_user)",
        ExpressionAttributeNames: {'#a': 'COMMENTS'},
        ExpressionAttributeValues: {':new_user': {name: "hgd250"}}
    }

    await updateDynamo(input)
}

module.exports = {getHomelessById, putHomeless, deleteHomeless, getAllHomeless, scanHomelessByOrgId, inertComment}