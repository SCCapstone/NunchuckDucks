import { Auth } from "aws-amplify";

/**
 * gets current authenticated user
 * @returns username
 */
export async function getCurrentAuthenticatedUser() {
  const { attributes } = await Auth.currentAuthenticatedUser();
  const username = attributes.preferred_username;
  return username;
}
