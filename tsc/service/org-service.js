const uuid = require("uuid");
const {getAllOrgInfo, getOrgById, putOrg, deleteOrg} = require("../dao/org-dao")

const getOrgByIdService = async (id) => {
    return getOrgById(id);
};


const putOrgService = async (data) => {
    return putOrg(data);
};

const getNexOrgID = async () => {
    const allOrg = await getAllOrgInfo()
    const ids = []
    allOrg.forEach(item => {
        ids.push(item.ORG_ID)
    })
    return Math.max(...ids) + 1
}

const postOrgService = async (data) => {
    data.ORG_ID = await getNexOrgID()
    return putOrg(data);
};


const deleteOrgService = async (id) => {
    return deleteOrg(Number.parseInt(id));
};

const listAllOrgService = async (id) => {
    return await getAllOrgInfo();
};


module.exports = {
    getOrgByIdService,
    putOrgService,
    postOrgService,
    deleteOrgService,
    listAllOrgService
}