import { Request, Response } from "express";

const feedbackController = (req: Request, res: Response) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
};

export default feedbackController;
