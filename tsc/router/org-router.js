const express = require('express');
const {
    getOrgByIdService,
    putOrgService,
    deleteOrgService,
    postOrgService,
    listAllOrgService
} = require("../service/org-service")
const router = express.Router();

router.use(express.json())

router.get('/org', async (req, res) => {
    if (!!req.query.id) {
        const data = await getOrgByIdService(req.query.id)
        if (!!data) {
            return res.json(data)
        } else {
            return res.status(404).send('Not found any item');
        }
    } else {
        return res.status(500).send('Paremeter error, not have "id" in the request');
    }

})

router.post('/org', async (req, res) => {
    const item = req.body;
    if (!!item?.ORG_ID) {
        return res.status(500).send("Error creating with a specific ORG_ID, for creating you should keep it empty.")
    }
    const response = await postOrgService(item)
    return res.send("ok")
})


router.put('/org', async (req, res) => {
    const item = req.body;
    if (!item?.ORG_ID) {
        return res.status(500).send("Error updating without a specific ORG_ID.")
    }
    const getExistedItem = await getOrgByIdService(item?.ORG_ID)

    if (!getExistedItem) {
        return res.status(500).send("Error updating with a wrong ORG_ID.")
    } else {
        const response = await putOrgService(item)
        return res.send("ok")
    }
})

router.delete('/org', async (req, res) => {
    if (!!req.query.id) {
        const data = await deleteOrgService(req.query.id)
        if (data?.$metadata?.httpStatusCode === 200) {
            return res.status(200).send("ok")
        } else {
            return res.status(500).send('Failed to remove');
        }
    } else {
        res.status(500).send('error');
    }
})


router.get('/listAllOrg', async (req, res) => {
    if (!!req.body) {
        const data = await listAllOrgService()
        return res.json(data);
    } else {
        return res.status(500).send('error');
    }
})


module.exports = router;