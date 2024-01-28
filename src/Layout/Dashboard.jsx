import {
  FaCalendarAlt,
  FaHome,
  FaShopify,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillContacts } from "react-icons/ai";

import { MdMenu } from "react-icons/md";

import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  return (
    <div className="drawer lg:drawer-open  ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  ">
        <Outlet />
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full text-base-content bg-[#D1A054]">
          {/* Sidebar content here */}

          <li>
            <NavLink to="/dashboard/home">
              <FaHome /> User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservations">
              <FaCalendarAlt /> Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/mycart">
              <FaShoppingCart></FaShoppingCart>
              My Cart
              <div className="badge badge-secondary">
                {" "}
                + {cart?.length || 0}
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/history">
              <FaWallet /> Payment History
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink>
              <AiOutlineHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              {" "}
              <MdMenu />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink>
              <FaShopify />
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink>
              {" "}
              <AiFillContacts />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
