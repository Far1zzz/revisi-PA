import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import { GlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const { handleFunction } = useContext(GlobalContext);

  const { handleLogout } = handleFunction;
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("user"));

  return (
    <React.Fragment>
      <nav className="bg-current border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl md:px-0 py-2.5">
          <span href="" className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Seal_of_the_Ministry_of_Internal_Affairs_of_the_Republic_of_Indonesia_%282020_version%29.svg/1200px-Seal_of_the_Ministry_of_Internal_Affairs_of_the_Republic_of_Indonesia_%282020_version%29.svg.png"
              className="h-6 mr-3 sm:h-9"
              alt=""
            />
            <a
              href="https://www.kemendagri.go.id/"
              target="_blank"
              rel="noreferrer noopener"
              className="pl-px text-white self-center text-sm font-bold whitespace-nowrap dark:text-blue hover:text-blue-500"
            >
              DISDUKCAPIL
              <p className="text-yellow-500">KEMENDAGRI</p>
            </a>
          </span>
          <div className="flex items-center">
            {localStorage.getItem("token") && (
              <div className="z-40 px-5 text-white self-center text-xl font-bold whitespace-nowrap  ">
                <Dropdown
                  label={
                    <Avatar
                      alt="User settings"
                      img="https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM="
                      rounded={true}
                    />
                  }
                  arrowIcon={false}
                  inline={true}
                >
                  <div className="pl-4 pr-2 pb-3">
                    <p className="block text-sm">{data.nama}</p>
                    <p className="block truncate text-sm font-medium">
                      {data.email}
                    </p>
                  </div>
                  <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </nav>
      {localStorage.getItem("token") && (
        <nav className="sticky top-0 z-10 bg-gray-700 dark:bg-gray-700">
          <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
            <div className="flex items-center">
              <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                <li>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/");
                    }}
                    className="text-gray-200 dark:text-white hover:text-blue-500"
                    aria-current="page"
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/info");
                    }}
                    className="text-gray-200 dark:text-white hover:text-blue-500"
                  >
                    INFO
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/inputData");
                    }}
                    className="text-gray-200 dark:text-white hover:text-blue-500"
                  >
                    INPUT DATA
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/contact");
                    }}
                    className="text-gray-200 dark:text-white hover:text-blue-500"
                  >
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <Outlet />
    </React.Fragment>
  );
};

export default Navbar;
