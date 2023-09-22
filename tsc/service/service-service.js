const {getAllOrgServiceInfo, getOrgServiceById, putOrgService, deleteOrgService} = require("../dao/service-dao")

const getOrgServiceByIdService = async (id) => {
    return getOrgServiceById(id);
};


const putOrgServiceService = async (data) => {
    return putOrgService(data);
};

const getNextServiceID = async () => {
    const allService = await getAllOrgServiceInfo()
    const ids = []
    allService.forEach(item => {
        ids.push(item.SERVICE_ID)
    })
    return Math.max(...ids) + 1
}

const postOrgServiceService = async (data) => {
    data.SERVICE_ID = await getNextServiceID()
    return putOrgService(data);
};


const deleteOrgServiceService = async (id) => {
    return deleteOrgService(Number.parseInt(id));
};

const listAllOrgServiceService = async (id) => {
    return await getAllOrgServiceInfo();
};


module.exports = {
    getOrgServiceByIdService,
    putOrgServiceService,
    postOrgServiceService,
    deleteOrgServiceService,
    listAllOrgServiceService
}