import express, { Request, Response } from "express";
import feedbackController from "../../controllers/mpFeedback";
const router = express.Router();

router.get("/", (req: Request, res: Response) => feedbackController(req, res));

export default router;
