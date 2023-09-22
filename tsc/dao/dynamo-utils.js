require('dotenv').config();
const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    DeleteCommand,
    ScanCommand,
    UpdateCommand
} = require("@aws-sdk/lib-dynamodb");


const client = new DynamoDBClient({region: process.env.AWS_REGION});
const docClient = DynamoDBDocumentClient.from(client);


const scanWholeTable = async (query) => {
    let finalResult = [];
    let command = new ScanCommand(query);
    const response = await client.send(command);
    finalResult = [...response.Items]
    //Get all the data in the table
    while (!!response?.LastEvaluatedKey) {
        query.ExclusiveStartKey = response.LastEvaluatedKey
        command = new ScanCommand(query);
        const response = await client.send(command);
        finalResult = [...finalResult, ...response.Items]
    }
    return finalResult
}


const getData = async (input) => {
    const command = new GetCommand(input);
    const response = await docClient.send(command);
    return response.Item;
};


const getDynamo = async (input) => {
    const command = new GetCommand(input);
    const response = await docClient.send(command);
    return response.Item;
};

const putDynamo = async (input) => {
    const command = new PutCommand(input);
    return await docClient.send(command);
};

const deleteDynamo = async (input) => {
    const command = new DeleteCommand(input);
    return await docClient.send(command);
};

const updateDynamo = async (input) => {
    const command = new UpdateCommand(input);
    return await docClient.send(command);

}

const genExpression = async (data, keyStr) => {
    let updateExpressionArray = []
    let expressionAttributeNames = {}
    let expressionAttributeValues = {}
    Object.keys(data).forEach(key => {
        if (key !== keyStr) {
            updateExpressionArray.push(' #' + key + ' = :' + key)
            expressionAttributeNames["#" + key] = key
            expressionAttributeValues[":" + key] = data[key]
        }
    })
    return {
        updateExpression: "set" + updateExpressionArray.join(","),
        expressionAttributeNames: expressionAttributeNames,
        expressionAttributeValues: expressionAttributeValues
    }
}

module.exports = {
    scanWholeTable, getDynamo, putDynamo, deleteDynamo, updateDynamo, genExpression
}