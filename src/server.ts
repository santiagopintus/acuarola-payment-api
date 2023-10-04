import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import mercadopago from "mercadopago";
// Load environment variables from a .env file
dotenv.config();

const mpToken =
  process.env.stage === "production"
    ? process.env.MP_TOKEN
    : process.env.MP_TOKEN_TEST;

if (mpToken?.length) {
  mercadopago.configure({
    access_token: mpToken,
  });
} else {
  console.error("MP_TOKEN NOT FOUND");
}

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("../../client/html-js"));
app.use(cors());

//Routes
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
