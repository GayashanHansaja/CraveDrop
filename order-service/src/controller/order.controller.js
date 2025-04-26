import Order from '../model/order.model.js';
import Product from '../model/product.model.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const createOrder = async (req, res) => {
  try {
    const { userId, items, paymentMethod, currency, deliveryAddress, phoneNumber } = req.body;

    if (!userId || !Array.isArray(items) || items.length === 0 || !paymentMethod || !currency || !deliveryAddress) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    let totalAmount = 0;
    const enrichedItems = [];

    // Validate and enrich products
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      enrichedItems.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }

    let clientSecret = null;

    // If payment method is card, call Payment Service
    if (paymentMethod === 'card') {
      const paymentResponse = await axios.post(process.env.PAYMENT_SERVICE_URL, {
        amount: totalAmount,
        currency,
      });
      clientSecret = paymentResponse.data.clientSecret;
    }

    // Create the Order
    const order = new Order({
      userId,
      items: enrichedItems,
      totalAmount,
      paymentMethod,
      paymentClientSecret: clientSecret,
      deliveryAddress,
      phoneNumber,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Order creation failed:', error.message);
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

  

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (error) {
    console.error('Get order failed:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(updated);
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete failed:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find(); // Fetch all orders from the database
      res.status(200).json(orders);
    } catch (error) {
      console.error('Get all orders failed:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
};