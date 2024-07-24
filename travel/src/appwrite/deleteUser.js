import { Client, Users } from "node-appwrite";
import conf from "../config/conf";

const client = new Client()
  .setEndpoint(conf.appwriteUrl)
  .setProject(conf.appwriteProjectId)
  .setKey(conf.appwriteProjectKey);

const users = new Users(client);
export async function deleteUser(userId) {
  try {
    return await users.delete(userId);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
