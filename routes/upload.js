const express = require('express');
const router = express.Router();
const {imageUpload,allimage,deleteimage} = require("../controllers/uploadimage");

router.post("/image",imageUpload);
router.get("/allimage",allimage);
router.delete("/deleteimage/:id",deleteimage);

module.exports = router;