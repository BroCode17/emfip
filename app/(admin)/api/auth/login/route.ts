import  bcrypt  from 'bcryptjs';
import {Client, Account} from 'node-appwrite'
import { createAdminClient } from '../../appwriterapi';
import { getError } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';
import { saveSession, teminateSession } from '@/lib/help';
import { cookies } from 'next/headers';


const client = new Client()
.setEndpoint(process.env.APPWRITE_END_POINT!)
.setProject(process.env.APPWRITE_PROJECT_KEY!)

// This route is for logout the user
export async function GET(_request: NextRequest){
  return LogoutUser()
}

export async function POST(request: NextRequest){
  const res = await request.json();
  const {email, password: pass} = res
  return LoginUser({email, pass})

}


async function LoginUser({email, pass}:{email: string; pass: string}) {
  const {account} = await createAdminClient()
  const error = {
    type: '',
    code: 500
  }
  if(!email || !pass){
    error.type = 'required_all';
    error.code = 400
    return getError(error)
  }

  // The t
  try {
    const sesson = await account.createEmailPasswordSession(email, pass)

    // Save user session
    saveSession(sesson)
    // Create store user session
    return NextResponse.json({success: true});
  } catch (error) {
    return getError(error)
  }

}

async function LogoutUser() {
  try{
    teminateSession();
    return NextResponse.json({success: true});
  } catch (error) {
    console.error(error)
    return getError(error)
  }
}
