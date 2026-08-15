"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const baseButtonClass =
    "rounded-md px-2.5 py-2 text-xs sm:text-sm font-medium transition-colors text-black cursor-pointer";
  const defaultButtonClass = `${baseButtonClass} hover:bg-gray-600 text-white`;
  const activeButtonClass = `${baseButtonClass} bg-gray-900 font-bold text-white`;

  const getButtonClass = (path: string) =>
    pathname === path ? activeButtonClass : defaultButtonClass;

  return (
    <nav className="mb-8 bg-gray-800">
      <div className="mx-auto flex max-w-6xl gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
          <Link href="/" className={getButtonClass("/")}>
            Home
          </Link>
          <Link href="/blogs" className={getButtonClass("/blogs")}>
            blogs
          </Link>
          <Link href="/users" className={getButtonClass("/users")}>
            users
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
          {session ? (
            <>
              <Link href="/blogs/new" className={getButtonClass("/blogs/new")}>
                create new
              </Link>
              <Link href="/me" className={getButtonClass("/me")}>
                me
              </Link>
              <button className="btn" onClick={() => signOut()}>
                logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={getButtonClass("/login")}>
                login
              </Link>
              <Link href="/register" className={getButtonClass("/register")}>
                register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
