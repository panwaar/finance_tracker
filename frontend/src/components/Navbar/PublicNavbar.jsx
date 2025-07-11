import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SiAuthy } from "react-icons/si";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

export default function PublicNavbar() {
  return (
    <Disclosure as="nav" className="bg-blue-100 shadow py-6">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between  items-center">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative ml-2 inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <Link to="/">
                  <img src="/logo.png" alt="Logo" className="h-[8rem] w-auto" />
                </Link>

                <div className="flex flex-shrink-0 items-center"></div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
                  >
                    Finance Tracker
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    to="/register"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                  >
                    <FaRegUser className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="relative ml-2 inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <RiLoginCircleLine
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    Login
                  </Link>
                </div> 
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <Link to="/">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Finance Tracker
                </Disclosure.Button>
              </Link>

              <Link to="/register">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Register
                </Disclosure.Button>
              </Link>
              <Link to="/login">
                <Disclosure.Button
                  as="button"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
