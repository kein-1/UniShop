import { Link } from "react-router-dom";
import CartDisplay from "./CartDisplay";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-12 py-6 sticky top-0 border-y-slate-400 border-b-2 bg-white">
      <ul className="flex gap-4">
        <Link to="/">
          <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
            HOME
          </h3>
        </Link>
        <Link to="/shop">
          <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
            UNISHOP
          </h3>
        </Link>
      </ul>

      <Link to="/">
        <h2 className="font-black tracking-widest">UNISHOP</h2>
      </Link>
      <ul className="flex gap-4">
        <Link to="/">
          <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
            SEARCH
          </h3>
        </Link>
        <Link to="/account">
          <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
            ACCOUNT
          </h3>
        </Link>
        <CartDisplay />
      </ul>
    </nav>
  );
};

export default Navbar;
