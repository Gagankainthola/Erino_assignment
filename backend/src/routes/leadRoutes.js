const express = require("express");
const { createLead, getLeads, getLeadById, updateLead, deleteLead } = require("../controllers/leadController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.put("/:id", protect, updateLead);
router.delete("/:id", protect, deleteLead);

module.exports = router;
