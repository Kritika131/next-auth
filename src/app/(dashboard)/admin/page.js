import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import Link from "next/link";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user) {
    // return (
    return (
      <h2 className="text-2xl">
        Admin page - welcome back {session?.user.username}
      </h2>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">Please login to see this page</h1>
      {/* <Link href="/login">Login</Link> */}
      <Link
        className=" text-center text-white font-semibold border px-4 py-1 rounded-md bg-blue-700  hover:bg-blue-500"
        href="/sign-in"
      >
        Login
      </Link>
    </div>
  );
};

export default AdminPage;
