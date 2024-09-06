import { cookies } from "next/headers"


const saveSession = (session: any) => {
   //save user in session
   cookies().set(process.env.APPWRITE_SESSION_KEY!, session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  })
}

const teminateSession = () => {
  cookies().delete(process.env.APPWRITE_SESSION_KEY as string)
}


export {
  saveSession,
  teminateSession
}
