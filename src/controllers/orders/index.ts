import Order from "../../models/order.model";
import { Request, Response, ErrorRequestHandler } from "express";

/* Response to /orders route */
const getOrders = async (
  _: Request,
  res: Response,
  id: string | null | undefined = null
) => {
  try {
    let orders;
    if (id) {
      orders = await Order.findOne({ _id: id });
    } else {
      orders = await Order.find();
    }
    if (orders == null) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error getting orders");
  }
};

const addOrder = async (req: Request, res: Response) => {
  /* Checks for a valid req.body before reading it */
  if (!req.body) {
    console.log(req.body);
    res.status(400).json({ message: "Invalid request body" });
    return;
  }

  const { firstName, lastName, buyerEmail, orderId, buyerAdress } = req.body;

  // Check if all fields are present
  if (!firstName || !lastName || !buyerEmail || !orderId || !buyerAdress) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create a new order document
  const newOrder = new Order({
    firstName,
    lastName,
    buyerEmail,
    orderId,
    buyerAdress,
  });

  // Save the new order document to the database
  try {
    // Save the new order document to the database
    const savedOrder = await newOrder.save();
    // Return the new order's ID in the response body
    return res.status(201).json({ id: savedOrder._id });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

/****** UPDATE *******/
const updateOrder = async (req: Request, res: Response) => {
  // Check if ID parameter is present
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  // Check if at least one field is present in request body
  const { firstName, lastName, buyerEmail, orderId, buyerAdress } = req.body;
  if (!firstName && !lastName && !buyerEmail && !orderId && !buyerAdress) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Update order with new values
  const updatedOrder = {
    firstName,
    lastName,
    buyerEmail,
    orderId,
    buyerAdress,
  };

  try {
    const result = await Order.findOneAndUpdate({ _id: id }, updatedOrder, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }
    /* If success */
    return res.status(204).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error updating order");
  }
};

/* DELETE A */
const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if ID parameter is present
  if (!id) {
    return res.status(400).json({ message: "ID parameter is required" });
  }

  try {
    // Delete order by ID
    const result = await Order.findOneAndDelete({ _id: id });

    // Check if order was found and deleted
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return 200
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error deleting order");
  }
};

export { getOrders, updateOrder, deleteOrder, addOrder };
