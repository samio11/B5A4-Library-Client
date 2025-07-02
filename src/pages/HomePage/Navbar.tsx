import { Link } from "react-router-dom";

const Navbar = () => {
  const navs = (
    <>
      <li>
        <Link to={"/"}>All Book</Link>
      </li>
      <li>
        <Link to={"/create-book"}>Add Book</Link>
      </li>
      <li>
        <Link to={"/show-borrow-summary"}>Borrow Summary</Link>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navs}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">BiblioBook</a>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 hidden lg:flex">{navs}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
