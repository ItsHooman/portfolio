// routes/project.js
const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/Project");
const authenticate = require("../middleware/auth");

const router = express.Router();

// Helper: normalize Mongo docs → { id, ...fields }
const toDTO = (doc) => {
  if (!doc) return null;
  const { _id, __v, ...rest } = doc;
  return { id: _id.toString(), ...rest };
};

// ---- PUBLIC ----
// Get All Projects (sorted newest → oldest)
router.get("/", async (_req, res) => {
  try {
    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .lean(); // return plain objects (faster)
    // Ensure fields like liveDemo, youtubeDemo, githubLink go out unchanged
    res.json(projects.map((p) => toDTO(p)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get One Project by id (public)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid id" });
    const project = await Project.findById(id).lean();
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(toDTO(project));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---- ADMIN ----
// Add Project (Admin Only)
router.post("/", authenticate, async (req, res) => {
  try {
    // Optional whitelist so random fields can’t slip in
    const allowed = ["title", "description", "technologies", "liveDemo", "githubLink", "youtubeDemo", "createdAt"];
    const body = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));

    const newProject = await Project.create(body);
    const plain = newProject.toObject();
    res.status(201).json({
      message: "Project created successfully!",
      project: toDTO(plain),
    });
  } catch (error) {
    // runValidators runs on create by default; keep helpful message
    res.status(500).json({ error: error.message });
  }
});

// Edit Project (Admin Only) — partial update, with validation
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid id" });

    const allowed = ["title", "description", "technologies", "liveDemo", "githubLink", "youtubeDemo"];
    const update = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));

    const updated = await Project.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project updated successfully!", project: toDTO(updated) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Project (Admin Only)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid id" });

    const deleted = await Project.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
