import express, { Request, Response } from "express";
import ordersRouter from "./orders";
import feedbackRouter from "./mpFeedback";
import prefRouter from "./mpPreference";
import homeController from "../controllers";
const router = express.Router();
import db from "../db";

// Define your routes here

router.get("/", homeController);

// console.log(db);
db.asPromise().then(() => {
  router.use("/orders", ordersRouter);

  router.use("/feedback", feedbackRouter);

  router.use("/create-preference", prefRouter);
});

// Add more routes as needed

export default router;
