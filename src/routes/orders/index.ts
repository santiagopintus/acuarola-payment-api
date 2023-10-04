import express, { Request, Response } from "express";
import {
  getOrders,
  updateOrder,
  deleteOrder,
  addOrder,
} from "../../controllers/orders";
const router = express.Router();

/* *************  ORDERS  ************ */

/* ALL */
router.get("/", (req: Request, res: Response) => getOrders(req, res, null));
/* ONE */
router.get("/:id", (req: Request, res: Response) =>
  getOrders(req, res, req.params.id)
);
/* ADD */
router.post("/", (req: Request, res: Response) => addOrder(req, res));
/* UPDATE */
router.put("/:id", (req: Request, res: Response) => updateOrder(req, res));
/* DELETE */
router.get("/delete", (req: Request, res: Response) => deleteOrder(req, res));

// Add more routes as needed

export default router;
