import express from "express";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

// Create a new menu item
router.post("/", async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedMenuItem = await menuItem.save();

    console.log("Menu item successfully saved:", savedMenuItem);

    res.status(201).json({
      message: "Request saved successfully",
      menuItem: savedMenuItem,
    });
  } catch (err) {
    console.error("Error creating menu item:", err);
    res.status(400).json({
      message: "Error creating menu item",
      error: err.message,
    });
  }
});

// Get all menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({
      message: "Error fetching menu items",
      error: err.message,
    });
  }
});

// Update a menu item
router.put("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }
    res.status(200).json(menuItem);
  } catch (err) {
    console.error("Error updating menu item:", err);
    res.status(400).json({
      message: "Error updating menu item",
      error: err.message,
    });
  }
});

// Delete a menu item
router.delete("/:id", async (req, res) => {
  try {
    const result = await MenuItem.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting menu item:", err);
    res.status(500).json({
      message: "Error deleting menu item",
      error: err.message,
    });
  }
});

export default router;
