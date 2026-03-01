import { Schema, model, models } from "mongoose";

const TotalIncomeSchema = new Schema(
  {
    income: { type: Number, required: true, default: 0 }, // Total income, required and defaults to 0
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Check if model already exists to avoid OverwriteModelError
const TotalIncome = models.TotalIncome || model("TotalIncome", TotalIncomeSchema);

export default TotalIncome;
