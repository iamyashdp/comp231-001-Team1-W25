import express from "express";
import { createIncome, getIncome, updateIncome, deleteIncome } from "../controllers/incomeController.js";

const router = express.Router();

router.post("/:userId", createIncome);
router.get("/:userId", getIncome);
router.get("/:userId/:IncomeId", getIncome);
router.put("/:userId/:incomeId", updateIncome);
router.delete("/:userId/:incomeId", deleteIncome);
export default router;


