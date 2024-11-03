import Order from '../models/oderModel.js'
export const updatePaymentStatus = async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return next(errorHandler(404, "Order not found"));
  
      order.paymentStatus = "Paid";
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
  
      const updatedOrder = await order.save();
      return res.status(200).json({ message: "Payment confirmed", order: updatedOrder });
    } catch (error) {
      next(error);
    }
  };
  