import { Auth } from "aws-amplify";

export async function getCurrentAuthenticatedUser() {
  const { attributes } = await Auth.currentAuthenticatedUser();
  const username = attributes.preferred_username;
  return username;
}
