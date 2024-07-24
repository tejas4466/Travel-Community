import conf from "../config/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class JournalService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createJournal({ title, images, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteJournalsCollectionId,
        ID.unique(),
        {
          title,
          images,
          userId,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createJournal :: error", error);
    }
  }

  async updateJournal(id, { title, images, userId }) {
    try {
      const currentTime = new Date().toISOString();
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteJournalsCollectionId,
        id,
        {
          title,
          images,
          userId,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updateJournal :: error", error);
    }
  }

  async deleteJournal(id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteJournalsCollectionId,
        id
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteJournal :: error", error);
      return false;
    }
  }

  async getJournal(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteJournalsCollectionId,
        id
      );
    } catch (error) {
      console.error("Appwrite service :: getJournal :: error", error);
      return false;
    }
  }

  async getUserJournals(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteJournalsCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.error("Appwrite service :: getUserJournals :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteJournalsBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(
        conf.appwriteJournalsBucketId,
        fileId
      );
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteJournalsBucketId, fileId);
  }
  getFileView(fileId) {
    return this.storage.getFileView(conf.appwriteJournalsBucketId, fileId);
  }
}

const journalService = new JournalService();
export default journalService;
