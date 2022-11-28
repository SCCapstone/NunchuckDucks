import { Auth } from "aws-amplify";


export async function getCurrentAuthenticatedUser() {
    const { attributes } = await Auth.currentAuthenticatedUser();
      return attributes.preferred_username;
}