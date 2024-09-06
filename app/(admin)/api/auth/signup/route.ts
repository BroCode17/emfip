import { NextRequest } from "next/server";
import  { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { createAdminClient } from "../../appwriterapi";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { getError } from "@/lib/logger";

export async function POST(request: NextRequest){

  const {name, email, password} = await request.json()
   console.log(name, email, password)
  //perform validation
    if(!email || !password || !name){
      //return Error
      return NextResponse.json({error: 'All fields are required'}, {status: 400})
    }

    //check if user is alread exist

    //hash password
    // Appwrite will hash the password
    //const hashPassword = await bcrypt.hash(password, 10);

    //get appwrite session
    const {account}  = await createAdminClient()

    try {
       //create use first
    await account.create(ID.unique(), email, password, name)
    //create user session for login
    const session = await account.createEmailPasswordSession(email, password)

    //save user in session
    cookies().set('session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    })
  //pass

    return NextResponse.json({message: 'User created successfully'}, {status: 201})
    } catch (error:any) {
      console.error('Signup error', error);

      return getError(error)
    }

}
