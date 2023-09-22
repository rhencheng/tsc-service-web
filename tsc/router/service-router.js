const express = require('express');
const {
    getOrgServiceByIdService,
    putOrgServiceService,
    deleteOrgServiceService,
    postOrgServiceService,
    listAllOrgServiceService
} = require("../service/service-service")
const router = express.Router();

router.use(express.json())

router.get('/service', async (req, res) => {
    if (!!req.query.id) {
        const data = await getOrgServiceByIdService(req.query.id)
        if (!!data) {
            return res.json(data)
        } else {
            return res.status(404).send('Not found any item');
        }
    } else {
        return res.status(500).send('Paremeter error, not have "id" in the request');
    }

})

router.post('/service', async (req, res) => {
    const item = req.body;
    if (!!item?.SERVICE_ID) {
        return res.status(500).send("Error creating with a specific SERVICE_ID, for creating you should keep it empty.")
    }
    const response = await postOrgServiceService(item)
    return res.send("ok")
})


router.put('/service', async (req, res) => {
    const item = req.body;
    if (!item?.SERVICE_ID) {
        return res.status(500).send("Error updating without a specific SERVICE_ID.")
    }
    const getExistedItem = await getOrgServiceByIdService(item?.SERVICE_ID)

    if (!getExistedItem) {
        return res.status(500).send("Error updating with a wrong ID.")
    } else {
        const response = await putOrgServiceService(item)
        return res.send("ok")
    }
})

router.delete('/service', async (req, res) => {
    if (!!req.query.id) {
        const data = await deleteOrgServiceService(req.query.id)
        if (data?.$metadata?.httpStatusCode === 200) {
            return res.status(200).send("ok")
        } else {
            return res.status(500).send('Failed to remove');
        }
    } else {
        res.status(500).send('error');
    }
})


router.get('/listAllServiceService', async (req, res) => {
    if (!!req.body) {
        const data = await listAllOrgServiceService()
        return res.json(data);
    } else {
        return res.status(500).send('error');
    }
})


module.exports = router;