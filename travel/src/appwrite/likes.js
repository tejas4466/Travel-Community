import conf from "../config/conf.js";
import { Client, ID, Databases } from "appwrite";

class LikeService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async likeResponse(responseId, userId) {
    try {
      const response = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteResponsesCollectionId,
        responseId
      );

      // Corrected the order to check for response.likes first
      const likes = response.likes || [];

      // Check if the userId already exists in the likes array to avoid duplicates
      if (!likes.includes(userId)) {
        likes.push(userId);

        await this.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteResponsesCollectionId,
          responseId,
          {
            likes: likes,
          }
        );
      } else {
        console.log("User has already liked this response.");
      }
    } catch (error) {
      console.error("Error liking response", error);
    }
  }

  async unlikeResponse(responseId, userId) {
    try {
      const response = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteResponsesCollectionId,
        responseId
      );

      // Ensure response.likes exists before filtering
      const likes = (response.likes || []).filter((id) => id !== userId);

      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteResponsesCollectionId,
        responseId,
        {
          likes: likes,
        }
      );
    } catch (error) {
      console.error("Error unliking response", error);
    }
  }
}

const likeService = new LikeService();
export default likeService;
