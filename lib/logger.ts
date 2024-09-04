import { NextResponse } from "next/server"

export function getError(error:any){
  switch (error.type) {
    case 'user_already_exists':
      return NextResponse.json({error: 'User already exists'}, {status: error.code})
    case 'user_invalid_credentials':
      return NextResponse.json({error: error.message}, {status: error.code})
    case 'user_unauthorized':
      return NextResponse.json({error: 'You are not authorized to perform this operation, contact admin'}, {status: error.code})
    default:
      return NextResponse.json({error: 'Server internal error'}, {status: 500})
  }
}
