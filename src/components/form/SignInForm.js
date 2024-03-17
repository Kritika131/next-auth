"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleSignInButton from "../GoogleSignInButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be atleast 8 characters."),
});

const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (values) => {
    //next-auth->provider
    // console.log("user signin values--", values);
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "http://localhost:3000/admin",
      // onError: async () => alert("Failed"),
    });
    // console.log(await signInData.json());
    // const response = await signInData.json();

    // alert("invalid credentials!");
    // console.log("signinData-", await signInData.json());
    // if (!response) {
    //   alert("invalid credentials!");
    // } else {
    //   router.refresh();
    //   router.push("/admin");
    // }
  };
  // const onSubmit=async (values)=>{
  //   signIn("credentials", {
  //     email: values.email,
  //     password: values.password,
  //     callbackUrl: "/admin",
  //     redirect: false, // Prevent automatic redirection
  //     // Access the error message from the `onError` callback
  //     message: error?.message,
  //   })
  //     .then((result) => {
  //       // Handle successful sign-in
  //       alert("sign in successfully!")
  //     })
  //     .catch((error) => {
  //       // Handle additional errors that might occur here
  //       alert(error.message)
  //     });

  // }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-4"
      >
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-400 hover:underline" href="/sign-up">
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
