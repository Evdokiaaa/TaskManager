import mongoose from "mongoose";

/* Если большая глобальная задача, которая разделена на несколько подзадач */
const todoScheme = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskScheme = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priotity: { type: String, enum: ["Low", "Medium", "High"] },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
  dueDate: { type: Date, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  todos: [todoScheme],
  progress: { type: Number, default: 0 },
});
export const Task = mongoose.model("Task", taskScheme);
