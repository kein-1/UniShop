import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { getAllCartItems } from "../services/cart";
import { useTotalPriceStore } from "../stateStore";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  // When form is big, we can use this tactic to have all the forms share a single state object
  // rather than use multiple useStates for each form value
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
  });

  // The global states we stored
  const cartPrice = useTotalPriceStore((state) => state.totalPrice);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const { cart } = await getAllCartItems();
        setCartItems(cart);
      } catch {
        console.log("FAILED TO RETRIEVE ITEMS");
      }
    };
    getCartItems();
  }, []);

  const formHandler = (event) => {
    event.preventDefault();
    console.log(event.target.id);
    setForm({
      email: "",
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      phoneNumber: "",
    });
  };

  // Learned this: ES6 bracket notation around a key lets us use a variable key
  // So now we can just copy over the current form object, then replace the key with
  // the ID key value (based on the input values ID)
  const inputHandler = (event) => {
    console.log(form);
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  return (
    <>
      <div className="flex mt-12 w-1/2 m-auto gap-4 h-4/5">
        <form className="w-full flex flex-col gap-4" onSubmit={formHandler}>
          <div className="flex flex-col gap-4">
            <p>Contact information</p>
            <div>
              <input
                type="text"
                id="email"
                value={form.email}
                onChange={inputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="">Shipping Address</p>

            <div className="flex gap-4">
              <input
                type="text"
                id="firstName"
                value={form.firstName}
                onChange={inputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="First Name"
              />

              <input
                type="text"
                id="lastName"
                value={form.lastName}
                onChange={inputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Last Name"
              />
            </div>

            <div className="flex gap-4 ">
              <input
                type="text"
                id="address"
                value={form.address}
                onChange={inputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Address"
              />
            </div>

            <div className="flex gap-4 ">
              <input
                type="text"
                id="city"
                value={form.city}
                onChange={inputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="City"
              />

              <input
                type="text"
                id="state"
                value={form.state}
                onChange={inputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="State"
              />

              <input
                type="text"
                id="zip"
                value={form.zip}
                onChange={inputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Zip"
              />
            </div>

            <div>
              <input
                type="number"
                id="phoneNumber"
                value={form.phoneNumber}
                onChange={inputHandler}
                className="input input-bordered input-primary w-full"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full text-sm w-full active:transform active:scale-90 active:duration-200 active:ease-out ">
            Place Order!
          </button>
        </form>

        <div className="divider divider-horizontal"></div>

        {/* Add overflow-y-auto to add scrolling once the items overflow the given height. It will have
        a scroll bar  */}
        <div className="w-full">
          <ul className="overflow-y-auto h-4/5">
            {cartItems.length === 0 && <h3>NO ITEMS IN CART</h3>}
            {cartItems.length > 0 &&
              cartItems.map((element) => (
                <CartItem key={element.id} {...element} />
              ))}
          </ul>
          <div className="divider"></div>

          <p className="h-1/5 mb-4">$ Total Cost: {cartPrice}</p>
        </div>
      </div>
    </>
  );
};

export default Checkout;
