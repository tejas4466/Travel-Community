const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteResponsesCollectionId: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_RESPONSES_ID
  ),
  appwriteMsgsCollectionId: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_MSGS_ID
  ),
  appwriteJournalsCollectionId: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_JOURNALS_ID
  ),
  appwriteJournalsBucketId: String(
    import.meta.env.VITE_APPWRITE_BUCKET_JOURNALS_ID
  ),
  appwriteResponsesBucketId: String(
    import.meta.env.VITE_APPWRITE_BUCKET_RESPONSES_ID
  ),
  appwriteProjectKey: String(import.meta.env.VITE_APPWRITE_PROJECT_KEY),
};
export default conf;
