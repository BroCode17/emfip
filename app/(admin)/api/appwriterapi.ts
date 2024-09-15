import { cookies } from "next/headers";
import { Client, Account } from "node-appwrite";


const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_END_POINT!)
    .setProject(process.env.APPWRITE_PROJECT_KEY!);

  const session = cookies().get('session')

  //check if there is session
  if(!session || !session.value){
    throw new Error('No session')
  }

  //update the client session
  client.setSession(session.value);

  return {
    get account(){
      return new Account(client)
    }
  }
}


const  createAdminClient = async () => {
  const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66d76b1a003cc9886eba')
  .setKey(process.env.APPWRITE_API_KEY!)

  return {
    get account(){
      return new Account(client)
    }
  }
}

//Get login user
const getLoggedInUser = async () => {
  try {
    const {account} = await createSessionClient();
    return await account.get()
  }catch(error){
    return null
  }
}



//Export all the util fuction
export  {
  getLoggedInUser,
  createAdminClient,
  createSessionClient,
}
