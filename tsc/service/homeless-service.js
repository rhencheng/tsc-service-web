const uuid = require("uuid");
const {
    getHomelessById,
    putHomeless,
    deleteHomeless,
    getAllHomeless,
    scanHomelessByOrgId,
    inertComment
} = require("../dao/homeless-dao")
const {getAllOrgInfo} = require("../dao/org-dao")

const getHomelessByIdService = async (id) => {
    return getHomelessById(id);
};


const putHomelessService = async (data) => {
    return putHomeless(data);
};

const postHomelessService = async (data) => {
    data.HOMELESS_ID = uuid.v4()
    return putHomeless(data);
};


const insertCommentService = async (data) => {
    return inertComment(data);
};


const deleteHomelessService = async (id) => {
    return deleteHomeless(id);
};

const listAllHomelessService = async (id) => {
    return await getAllHomeless();
};

const getAllHomelessForDashboardService = async () => {
    const data = await getAllHomeless();

    // Get all homeless nodes
    let nodes = [];
    // Get all org nodes
    const orgInDb = await getAllOrgInfo()
    let orgNodes = []
    orgInDb.forEach(item => {
        // orgNodes.push({id: 'ORG' + item["ORG_ID"], label: item['ORG_NAME'], size: 50, style: {fill: '#EBF2FF'},})
        orgNodes.push({
            id: 'ORG' + item["ORG_ID"],
			size: 70,
            labelLong: item['ORG_NAME'],
            label: item['ORG_NAME'].toString().substring(0, 3)
        })
    })

    // Init edges from homeless-> org
    let edges = [];

    for (const itemKey in data) {
        const item = data[itemKey]
        nodes.push({
            id: item['HOMELESS_ID'],
            labelLong: item['NAME'],
            label: item['NAME'].toString().substring(0, 8),
            size: 50,
            style: {fill: '#87BBF1'}
        })
        let currServiceMap = item['ORG_SERVICE']
        if (!!currServiceMap) {
            Object.keys(currServiceMap).forEach(orgId => {
                const service = currServiceMap[orgId]
                Object.keys(service).forEach(serviceId => {
                    edges.push({
                        source: orgId,
                        target: item['HOMELESS_ID'],
                        type: 'cubic-horizontal',
                        service: serviceId
                    })
                })
            })
        }
    }
    return {nodes: nodes.concat(orgNodes), edges: edges}
}

const scanHomelessByOrgIdService = async (id) => {
    return scanHomelessByOrgId(id);
};

const putHomelessOrgServiceService = async (data) => {
    const homeless = await getHomelessById(data.HOMELESS_ID);
    // homeless['ORG_SERVICE'][data.ORG_ID]={}
    const curItem=homeless['ORG_SERVICE']
    const serviceObj={}
    serviceObj[data.SERVICE_ID]={SERVICE_NAME:data.SERVICE_NAME}
    serviceObj["ORG_NAME"]=data.ORG_NAME
    curItem[data.ORG_ID]=serviceObj
    // curItem["HOMELESS_ID"]=data.HOMELESS_ID
    const inputData={
        HOMELESS_ID:data.HOMELESS_ID,
        ORG_SERVICE:curItem
    }
    inputData[data.ORG_ID]=true
    inputData[data.SERVICE_ID]=true

    return putHomeless(inputData);
};


module.exports = {
    getHomelessByIdService,
    putHomelessService,
    postHomelessService,
    deleteHomelessService,
    getAllHomelessForDashboardService,
    scanHomelessByOrgIdService,
    insertCommentService,
    listAllHomelessService,
    putHomelessOrgServiceService
}