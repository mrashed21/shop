"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const session = useSession();
  console.log("first", session);
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="">
        <h2 className="text-3xl font-bold "> Shop</h2>
      </div>

      <div className="">
        <ul className="flex space-x-4">
          <li>
            <Link href={"/"} className="px-4 py-2 hover:bg-gray-700 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/about"}
              className="px-4 py-2 hover:bg-gray-700 rounded"
            >
              About
            </Link>
          </li>
          {session?.data?.user ? (
            <li>
              <Link href={"/"} className="px-4 py-2 hover:bg-gray-700 rounded">
                Sign Out
              </Link>
            </li>
          ) : (
            <li>
              <Link href={"/"} className="px-4 py-2 hover:bg-gray-700 rounded">
                Sifn In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
