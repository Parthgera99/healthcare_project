const express = require("express");
const router = express.Router();
const { registerDoctor, getAllDoctors, getDoctorByEmail , deleteDoctor} = require("../controllers/doctorsDetailsController");
router.post("/register" , registerDoctor);
// router.get("/" , registerDoctor);

router.get("/", getAllDoctors);
router.get("/:email", getDoctorByEmail);
router.delete("/delete/:email", deleteDoctor);


module.exports=router;