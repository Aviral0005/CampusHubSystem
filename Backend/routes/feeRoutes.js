const express = require("express");
const router = express.Router();
const Fee = require("../models/Fee");

// get fees
router.get("/", async (req, res) => {

const fees = await Fee.find();
res.json(fees);

});

// add fee
router.post("/add", async (req, res) => {

const { studentName, amount, status } = req.body;

const fee = new Fee({
studentName,
amount,
status
});

await fee.save();

res.json(fee);

});

// delete fee
router.delete("/:id", async (req, res) => {

await Fee.findByIdAndDelete(req.params.id);

res.json({message:"Deleted"});

});

module.exports = router;