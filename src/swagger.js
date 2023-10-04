/* For building Swagger docs */
const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

const doc = {
  info: {
    title: "Orders API",
    description: "API for managing orders",
    version: "1.0.0",
  },
  examples: {
    Order: {
      firstName: "Harry",
      lastName: "Potter",
      buyerEmail: "harrypotter@email.com",
      orderId: "Red & Yellow",
      buyerAdress: "1980-07-31",
    },
  },
  host: "orders-api-44sf.onrender.com",
  basePath: "/",
  schemes: ["https"],
  exclude: ["/api-docs"],
  definitions: {
    Order: {
      type: "object",
      properties: {
        firstName: {
          type: "string",
          default: "Harry",
        },
        lastName: {
          type: "string",
          default: "Potter",
        },
        buyerEmail: {
          type: "string",
          default: "harrypotter@email.com",
        },
        orderId: {
          type: "string",
          default: "Red & Yellow",
        },
        buyerAdress: {
          type: "string",
          default: "1980-07-31",
        },
      },
      description:
        "An order object represents a person and their order information.",
      required: [
        "firstName",
        "lastName",
        "buyerEmail",
        "orderId",
        "buyerAdress",
      ],
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
