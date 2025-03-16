const express = require("express");
const Project = require("../models/Project");
const authenticate = require("../middleware/auth");

const router = express.Router();

// 📌 Get All Projects (Public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Add Project (Admin Only)
router.post("/", authenticate, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ message: "Project created successfully!", project: newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Edit Project (Admin Only)
router.put("/:id", authenticate, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project updated successfully!", project: updatedProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Delete Project (Admin Only)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
