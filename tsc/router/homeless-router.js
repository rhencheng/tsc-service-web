const express = require('express');
const {
    getHomelessByIdService,
    putHomelessService,
    deleteHomelessService,
    getAllHomelessForDashboardService,
    postHomelessService,
    insertCommentService,
    scanHomelessByOrgIdService,
    listAllHomelessService,
    putHomelessOrgServiceService
} = require("../service/homeless-service")
const router = express.Router();

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

router.use(express.json())

router.get('/homeless', async (req, res) => {
    if (!!req.query.id) {
        const data = await getHomelessByIdService(req.query.id)
        if (!!data) {
            return res.json(data)
        } else {
            return res.status(404).send('Not found any item');
        }
    } else {
        return res.status(500).send('Paremeter error, not have "id" in the request');
    }

})

router.post('/homeless', async (req, res) => {
    const item = req.body;
    if (!!item?.HOMELESS_ID) {
        return res.status(500).send("Error creating with a specific HOMELESS_ID, for creating you should keep it empty.")
    }
    const response = await postHomelessService(item)
    return res.send("ok")
})


router.put('/homeless', async (req, res) => {
    const item = req.body;
    if (!item?.HOMELESS_ID) {
        return res.status(500).send("Error updating without a specific HOMELESS_ID.")
    }
    const getExistedItem = await getHomelessByIdService(item?.HOMELESS_ID)

    if (!getExistedItem) {
        return res.status(500).send("Error updating with a wrong HOMELESS_ID.")
    } else {
        const response = await putHomelessService(item)
        return res.send("ok")
    }
})

router.delete('/homeless', async (req, res) => {
    if (!!req.query.id) {
        const data = await deleteHomelessService(req.query.id)
        if (data?.$metadata?.httpStatusCode === 200) {
            return res.status(200).send("ok")
        } else {
            return res.status(500).send('Failed to remove');
        }
    } else {
        res.status(500).send('Paremeter error, not have "id" in the request');
    }
})


router.get('/getAllHomelessForDashboard', async (req, res) => {
    if (!!req.body) {
        const data = await getAllHomelessForDashboardService()
        return res.json(data);
    } else {
        return res.status(500).send('Paremeter error, not have "id" in the request');
    }
})

router.get('/listAllHomeless', async (req, res) => {
    const data = await listAllHomelessService()
    return res.json(data);

})

router.get('/getAllHomelessByOrg', async (req, res) => {
    if (!!req.body) {
        const data = await getAllHomelessForDashboardService()
        return res.json(data);
    } else {
        return res.status(500).send('Paremeter error, not have "id" in the request');
    }
})
router.get('/listHomelessByOrgIdService', async (req, res) => {
    if (!!req.query.id) {
        const data = await scanHomelessByOrgIdService(req.query.id)
        if (data) {
            return res.status(200).send(data)
        } else {
            return res.status(500).send('Failed to remove');
        }
    } else {
        res.status(500).send('Paremeter error, not have "id" in the request');
    }
})


router.post('/comment', async (req, res) => {
    const item = req.body;
    if (!!item?.HOMELESS_ID) {
        return res.status(500).send("Error creating with a specific HOMELESS_ID, for creating you should keep it empty.")
    }
    const response = await insertCommentService(item)
    return res.send("ok")
})


// "ORG_SERVICE": {
//     "ORG3": {
//         "ORG_NAME": "Amazon",
//             "SERVICE1": {
//             "SERVICE_NAME": "Training",
//                 "PROGRESS_DETAIL": [
//                 {
//                     "DESC": "Work on phase1",
//                     "TIME": "2024-01-27 10:48:09"
//                 },
//                 {
//                     "DESC": "Work on phase4",
//                     "TIME": "2024-02-29 10:48:09"
//                 },
//                 {
//                     "DESC": "Work on phase3",
//                     "TIME": "2024-02-22 10:48:09"
//                 }
//             ],
//                 "END_DATE": "2024-02-12",
//                 "START_DATE": "2024-01-18"
//         }
//     }
// },

router.post('/homelessOrgService', async (req, res) => {
    const item = req.body;
    if (!!!item?.HOMELESS_ID) {
        return res.status(500).send("Error update without a specific HOMELESS_ID.")
    }
    const response = await putHomelessOrgServiceService(item)
    return res.send("ok")
})


module.exports = router;