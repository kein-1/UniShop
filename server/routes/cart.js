const express = require("express");

const cartRouter = express.Router();
const client = require("../elephant");

// Setup an end point that lets you retrieve all the items in the cart
cartRouter.get("/", async (request, response) => {
  const { items } = request.session;
  if (!items) {
    return response.status(200).json({ cart: [] });
  }
  console.log(items);
  return response.status(200).json({ cart: items });
});

cartRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  if (!id) return response.status(400).send("Missing id");

  const { items } = request.session;
  if (!items) {
    return response.status(400).send("No items in cart. Invalid request to delete");
  }
  request.session.items = items.filter((element) => element.id !== Number(id));
  return response.status(201).json("deleted from cart");
});

cartRouter.post("/", async (request, response) => {
  const {
    id, title, quantity, totalPrice, productImage,
  } = request.body;

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
        productImage,
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
      productImage,
    },
  ];
  console.log(request.session);

  return response.status(201).send("Item added!");
});

module.exports = cartRouter;

/*
Express sessions:
  1.First time visiting there will be no cookie. Express will recognize this
  and assign a sessionID from its default memory store (not ideal. ideally
  we would want to setup a database store)
  2. The sessionID is stored as a random number of characters and sent back to the
  client in the form of a cookie
  3. Each subsequent request from the client will attach that cookie in its header,
  allowing express to recognize who the user is
  4. I stored the cart inside the Session object. By using express-session middleware,
  express automatically parses the session field inside our request object. We can access
  it using request.session. I coded it up so that we will populate the ITEMS field
  of the sessions object.
  5. Sessiosn object can store a lot more information on the server side and it is also
  more secure
  6. Here we are storing the user's cart items
  7. Express recognizes that each session object will be different from every different
  client because it checks its default memory store for the cookie that is sent with
  the request
*/
