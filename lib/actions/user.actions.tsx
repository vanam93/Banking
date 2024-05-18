'use server'

import { cookies } from "next/headers"
import { createAdminClient, createSessionClient } from "../appwrite"
import { ID } from "node-appwrite"
import { parseStringify } from "../utils"
import { redirect } from "next/navigation"

export const signIn = async ({ email, password }: signInProps) => {

    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
    
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });       
    
        return parseStringify(session);
    } catch (error: unknown) {
        console.log('Error', error)
    }
}

export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;
    try {
        //create a user account using appwrite
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount)

    } catch (error: unknown) {
        console.log('Error', error)
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}
export async function signOut() {

    try{
        const { account } = await createSessionClient();
        cookies().delete("appwrite-session");
        return await account.deleteSession("current");
      
    }catch(error) {
        return null
    }

}
