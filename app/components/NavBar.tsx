"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const baseButtonClass =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors text-black cursor-pointer";
  const defaultButtonClass = `${baseButtonClass} hover:bg-gray-600 text-white`;
  const activeButtonClass = `${baseButtonClass} bg-gray-900 font-bold text-white`;

  const getButtonClass = (path: string) =>
    pathname === path ? activeButtonClass : defaultButtonClass;

  return (
    <nav className="flex gap-4 p-4 mb-8 bg-gray-800">
      <div className="justify-start flex gap-4">
        <Link href="/">
          <button className={getButtonClass("/")}>Home</button>
        </Link>
        <Link href="/blogs">
          <button className={getButtonClass("/blogs")}>blogs</button>
        </Link>
        <Link href="/users">
          <button className={getButtonClass("/users")}>users</button>
        </Link>
      </div>
      <div className="flex justify-end gap-4">
        {session ? (
          <>
            <Link href="/blogs/new">
              <button className={getButtonClass("/blogs/new")}>
                create new
              </button>
            </Link>
            <Link href="/me">
              <button className={getButtonClass("/me")}>me</button>
            </Link>
            <button className="btn" onClick={() => signOut()}>
              logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className={getButtonClass("/login")}>login</button>
            </Link>
            <Link href="/register">
              <button className={getButtonClass("/register")}>register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
