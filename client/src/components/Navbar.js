import { Link } from "react-router-dom";
import CartDisplay from "./CartDisplay";

import { useUserStore } from "../stateStore";


const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.resetUser);
  const resetToken = useUserStore((state) => state.resetToken);
  
  const logoutHandler = async () => {
    try{
      resetUser()
      resetToken()
    }catch (error) {
      console.log(error)
    }
  }
  
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
        
        {user ? 
        <div>
          
          
          <div className="dropdown dropdown-end">
            <h3 tabIndex={0} className="font-black text-sm hover:underline underline-offset-8 decoration-blue-600 tracking-widest -translate-y-1">ACCOUNT</h3>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/account">ACCOUNT</Link></li>
              <li><Link onClick={logoutHandler} to="/">LOGOUT</Link></li>
            </ul>
          </div>
        </div>
        :
        <Link to="/account">
          <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
            ACCOUNT
          </h3>
          </Link>
}
        <CartDisplay />
      </ul>
    </nav>
  );
};

export default Navbar;
