import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";
// import { Users } from "node-appwrite";

export class AuthService {
  client = new Client();
  account;
  // users;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    // .setKey(conf.appwriteProjectKey);
    this.account = new Account(this.client);
    // this.users = new Users(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error getting current user:", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  // async deleteAccount(userId) {
  //   try {
  //     return await this.users.delete(userId);
  //   } catch (error) {
  //     console.error("Error deleting user account:", error);
  //   }
  // }
}

const authService = new AuthService();
export default authService;
