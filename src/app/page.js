import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  return (
    <div className="w-full h-full">
      {/* <h1 className="text-4xl">Home</h1>
      <Link className={buttonVariants()} href="/admin">
        Open My Admin
      </Link> */}
      {/* <Layout> */}
      <main
        className="h-screen bg-cover flex items-center justify-center bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/920377882/photo/beautiful-landscape-with-high-mountains-with-illuminated-peaks-stones-in-mountain-lake.webp?b=1&s=170667a&w=0&k=20&c=MC2f_T1Tioyi4gzm62JeohBuEMEiyM5UTgcQYMBrVjo=')`,
        }}
      >
        {" "}
        {/* Replace 'your-image.jpg' with your actual image name */}
        {/* Your home page content goes here */}
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-white text-3xl fo z-50 font-bold">
            Welcome to Parallel World!
          </h1>

          <p className="text-gray-300 text-xl">
            This is a dummy home page using nextjs and tailwing css.
          </p>
          <Link className={buttonVariants()} href="/admin">
            Go To Admin
          </Link>
        </div>
      </main>
      {/* </Layout> */}
    </div>
  );
}
