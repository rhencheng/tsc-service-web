const fs = require("fs");
const path = require("path");
const {putDynamo} = require("../dao/dynamo-utils");
require('dotenv').config();


function listFile(dir) {
    const arr = fs.readdirSync(dir);
    const list = [];
    arr.forEach(function (item) {
        var fullpath = path.join(dir, item);
        var stats = fs.statSync(fullpath);
        if (stats.isFile()) {
            list.push(fullpath);
        }
    });
    return list;
}

const dataDir = path.join(__dirname, 'data');
const jsonFiles = listFile(dataDir)

jsonFiles.forEach((x) => {
    const data = fs.readFileSync(x);
    const jsonData = JSON.parse(data.toString())
    const input = {
        TableName: "HOMELESS",
        Item: jsonData
    }
    putDynamo(input).then(r => console.log("Successfully load:" + jsonData.HOMELESS_ID));
})