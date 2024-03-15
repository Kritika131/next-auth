import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

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
    <div>
      <h1 className="text-2xl">Please login to see this page </h1>
    </div>
  );
};

export default AdminPage;
