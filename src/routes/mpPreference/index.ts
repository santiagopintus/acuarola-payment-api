import express, { Request, Response } from "express";
import prefController from "../../controllers/mpPreference";
const router = express.Router();

router.post("/", (req: Request, res: Response) => prefController(req, res));

export default router;
