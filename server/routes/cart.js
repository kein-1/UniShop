const express = require("express");

const cartRouter = express.Router();
const client = require("../elephant");

cartRouter.get("/", async (request, response) => {
  console.log(request.headers);
  console.log(request.sessionID);

  const { items } = request.session;
  if (!items) {
    return response.status(200).send("You have no items in your cart");
  }
  console.log(items);
  return response.status(200).json({ cart: items });
});

cartRouter.post("/", async (request, response) => {
  const {
    id, title, quantity, totalPrice,
  } = request.body;

  console.log(request.headers);

  // If this field exists, we add the item to it
  // Otherwise we make a new field called items and add the first
  // item. The items field will be an array with each element
  // as an items object
  const { items } = request.session;

  let exists = false;
  if (items) {
    /*
    // I WAS USING A RETURN STATEMENT INSIDE FOREACH THINKING ITLL
    RETURN OUT OF THE EXPRESS FUNCTION
    // BUT INSTEAD REMEMBER FOREACH TAKES IN A CALLBACK FUNCTION.
    THUS WHEN I DID RETURN, IT WAS JUST
    FOR THAT INSTANCE OF THE ELEMENT IN THE ARRAY. IT IS STILL RUNNING
    FOR THE REMAINIING ELEMENTS !! I WAS GETTING A LOT OF SET-HEADER
    ERROR SINCE THE SUBSEQUENT CODE WAS STILL RUNNING
    THAT IS WHY I USED A BOOLEAN VALUE TO TRACK
    */
    items.forEach((element) => {
      if (id === element.id) {
        element.quantity += quantity;
        element.totalPrice += totalPrice;
        console.log(request.session);
        exists = true;
      }
    });
    if (!exists) {
      items.push({
        id,
        title,
        quantity,
        totalPrice,
      });
    }
    console.log(request.session);

    return response.status(201).send("Item added!");
  }
  request.session.items = [
    {
      id,
      title,
      quantity,
      totalPrice,
    },
  ];
  console.log(request.session);

  return response.status(201).send("Item added!");
});

module.exports = cartRouter;
