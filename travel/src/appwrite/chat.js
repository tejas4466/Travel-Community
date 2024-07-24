import { Client, Databases, ID, Query } from "appwrite";
import conf from "../config/conf";

class ChatService {
  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.database = new Databases(this.client);
    this.databaseId = conf.appwriteDatabaseId;
    this.collectionId = conf.appwriteMsgsCollectionId;
  }

  async fetchMessages() {
    const response = await this.database.listDocuments(
      this.databaseId,
      this.collectionId,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    return response.documents;
  }

  async createMessage(message) {
    const response = await this.database.createDocument(
      this.databaseId,
      this.collectionId,
      ID.unique(),
      message
    );
    return response;
  }

  async deleteMessage(messageId) {
    await this.database.deleteDocument(
      this.databaseId,
      this.collectionId,
      messageId
    );
  }

  subscribeToMessages(callback) {
    const unsubscribe = this.client.subscribe(
      `databases.${this.databaseId}.collections.${this.collectionId}.documents`,
      callback
    );
    return () => {
      unsubscribe();
    };
  }
}
const chatService = new ChatService();
export default chatService;
