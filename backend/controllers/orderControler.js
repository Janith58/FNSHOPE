import Order from "../models/oderModel.js";
import { errorHandler } from "../utils/error.js";

export const createOrder = async (req, res, next) => {
  try {
    console.log(req.body)
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
    const order = new Order({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });
   

    const createdOrder = await order.save();
    return res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return next(errorHandler(404, "Order not found"));
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(errorHandler(404, "Order not found"));

    if (req.user.isAdmin || req.user._id.toString() === order.user.toString()) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      return res.status(200).json(updatedOrder);
    } else {
      return next(errorHandler(403, "Unauthorized to update this order"));
    }
  } catch (error) {
    next(error);
  }
};
