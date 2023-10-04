import { Request, Response } from "express";
import mercadopago from "mercadopago";

export type MPItem = {
  _id: string;
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
};
export type RawItems = {
  _id: string;
  id: string;
  title: string;
  quantity: string;
  unit_price: string;
};

const parseBody = (items: RawItems[]) => {
  return items.map((item) => {
    // Parse the unit_price and quantity to numbers
    const unit_price = parseFloat(item.unit_price);
    const quantity = parseInt(item.quantity);

    // Check if the parsing was successful, and if not, provide default values or handle the error as needed
    if (isNaN(unit_price)) {
      // Handle parsing error for unit_price
      throw new Error(`Invalid unit_price for item with _id ${item._id}`);
    }

    if (isNaN(quantity)) {
      // Handle parsing error for quantity
      throw new Error(`Invalid quantity for item with _id ${item._id}`);
    }

    return {
      _id: item._id,
      unit_price, // Store the parsed unit_price as a number
      quantity, // Store the parsed quantity as a number
      id: item.id,
      title: item.title,
    };
  });
};

const createPreference = (req: Request, res: Response) => {
  let preference = {
    items: parseBody(req.body as RawItems[]),
    back_urls: {
      success: "http://localhost:3000/feedback",
      failure: "http://localhost:3000/feedback",
      pending: "",
    },
    auto_return: "approved" as "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default createPreference;
