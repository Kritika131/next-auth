// import prisma from '@/lib/db'
import {NextResponse} from 'next/server'
// import bcrypt from 'bcrypt'
import {hash} from 'bcrypt'
import * as z from 'zod'
import { PrismaClient } from '@prisma/client'
//Define schema for input validation
const userSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be atleast 8 characters."),
    
  })

const prisma = new PrismaClient();
  

export async function GET(req){
      return NextResponse.json(
        {  message: "GET API" },
        { status:200 }
      ); 
}

export async function POST(req){
  try{
    const body =await req.json()
    console.log("body data--",body);
    
    //applying zod userSchema validation on body
    // const {email,username,password} = userSchema.parse(body)
    const {email,username,password} = body
    const existingUserEmail = await prisma.user.findUnique({
       where:{email:email}
    })
    console.log("existing user email--",existingUserEmail);
    if(existingUserEmail){
      return NextResponse.json({user:null,message:"User with this email already exists"},{status:409}) 

    }
    const existingUsername = await prisma.user.findUnique({
       where:{username:username}
    })
    if(existingUsername){
      return NextResponse.json({user:null,message:"User with this username already exists"},{status:409})

    }

    const hashPassword = await hash(password,10)
    console.log("hashpassword--",hashPassword);

    const newUser = await prisma.user.create({
      data:{
        username:username,
        email:email,
        password:hashPassword
      }
    })
    console.log("new user added--",newUser);

    //destructuring password and rest data from newUser
    const {password:newUserPassword,...rest} = newUser;



    return NextResponse.json({success:true,user:rest,message:"User created successfully"},{status:201})
    
  } catch(err){
    return NextResponse.json({success:false,message:"Something want wrong! "},{status:500})

  }
}