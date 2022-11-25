import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex justify-between px-12 py-6">
      <ul className="flex gap-4">
        <li>
          <Link to="/">
            <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
              HOME
            </h3>
          </Link>
        </li>
        <li>
          <Link to="/shop">
            <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
              UNISHOP
            </h3>
          </Link>
        </li>
      </ul>

      <Link to="/">
        <h2 className="font-black tracking-widest">UNISHOP</h2>
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link to="/">
            <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
              SEARCH
            </h3>
          </Link>
        </li>
        <li>
          <Link to="/shop">
            <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
              ACCOUNT
            </h3>
          </Link>
        </li>
        <li>
          <Link to="/cart">
            <h3 className="font-black hover:underline underline-offset-8 decoration-blue-600 tracking-widest">
              BAG
            </h3>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
