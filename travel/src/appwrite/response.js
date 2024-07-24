import conf from "../config/conf.js";
import { Client, ID, Databases, Storage } from "appwrite";

class CommunityService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createResponse({
    touristPlaceName,
    location,
    timeOfTravel,
    experience,
    rate,
    inference,
    bestMonth,
    problems,
    stayAndFood,
    suggestions,
    images,
    userId,
    userName,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteResponsesCollectionId,
        ID.unique(),
        {
          touristPlaceName,
          location,
          timeOfTravel,
          experience,
          rate,
          inference,
          bestMonth,
          problems,
          stayAndFood,
          suggestions,
          images,
          userId,
          userName,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createResponse :: error", error);
    }
  }
  async updateResponse(
    id,
    {
      touristPlaceName,
      location,
      timeOfTravel,
      experience,
      rate,
      inference,
      bestMonth,
      problems,
      stayAndFood,
      suggestions,
      images,
      userId,
      userName,
    }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteResponsesCollectionId,
        id,
        {
          touristPlaceName,
          location,
          timeOfTravel,
          experience,
          rate,
          inference,
          bestMonth,
          problems,
          stayAndFood,
          suggestions,
          images,
          userId,
          userName,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updateResponse :: error", error);
    }
  }

  async deleteResponse(id) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteResponsesCollectionId,
        id
      );
    } catch (error) {
      console.error("Appwrite service :: deleteResponse :: error", error);
    }
  }

  async getResponse(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteResponsesCollectionId,
        id
      );
    } catch (error) {
      console.error("Appwrite service :: getResponse :: error", error);
      return false;
    }
  }

  async getResponses() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteResponsesCollectionId
      );
    } catch (error) {
      console.error("Appwrite service :: getResponses :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteResponsesBucketId,
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
        conf.appwriteResponsesBucketId,
        fileId
      );
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error", error);
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteResponsesBucketId, fileId);
  }
  getFileView(fileId) {
    return this.storage.getFileView(conf.appwriteResponsesBucketId, fileId);
  }
}

const communityService = new CommunityService();
export default communityService;
