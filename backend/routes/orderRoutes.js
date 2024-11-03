import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createOrder, getOrder, updateOrderStatus } from "../controllers/orderControler.js";
import { updatePaymentStatus } from "../controllers/paymentControler.js";

const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/:id", verifyToken, getOrder);
router.put("/:id/status", verifyToken, updateOrderStatus);
router.put("/:id/payment", verifyToken, updatePaymentStatus);

export default router;
