import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ["main course", "appetizer", "dessert", "drink"],
    required: true,
  },
});

export default mongoose.model("MenuItem", menuItemSchema);
