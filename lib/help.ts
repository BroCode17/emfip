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

const  generateOrderId = () =>  {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 14);
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

const getStringDate  = () =>  new Date().toISOString().slice(0, 10);


export {
  saveSession,
  teminateSession,
  getStringDate
}
