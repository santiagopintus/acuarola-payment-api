import { Request, Response } from "express";
/* Handles Home Route */
export default (req: Request, res: Response) => {
  res.send('<a href="/orders">Go to Orders</a>');
};
