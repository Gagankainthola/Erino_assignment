const Lead = require("../models/lead.js")
// CREATE
const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL with Pagination + Filters
const getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 20, ...filters } = req.query;
    const query = {};

    // apply filters dynamically
    if (filters.email) query.email = { $regex: filters.email, $options: "i" };
    if (filters.company) query.company = { $regex: filters.company, $options: "i" };
    if (filters.city) query.city = { $regex: filters.city, $options: "i" }; 
    if (filters.status) query.status = filters.status;
    if (filters.source) query.source = filters.source;
    if (filters.is_qualified) query.is_qualified = filters.is_qualified === "true";

    if (filters.score_gt) query.score = { ...query.score, $gt: +filters.score_gt };
    if (filters.score_lt) query.score = { ...query.score, $lt: +filters.score_lt };
    if (filters.lead_value_gt) query.lead_value = { ...query.lead_value, $gt: +filters.lead_value_gt };

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      data: leads,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead };
