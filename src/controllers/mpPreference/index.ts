import { Request, Response } from "express";
import mercadopago from "mercadopago";

const createPreference = (req: Request, res: Response) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
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
