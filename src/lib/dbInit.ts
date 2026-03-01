import { connectMongoDB } from '../app/api/connection/connection';

let isInitialized = false;
export const initializeDatabase = async () => {
  if (!isInitialized) {
    try {
      await connectMongoDB();
      isInitialized = true;
      console.log('Database initialized successfully.');
    } catch (error) {
      console.error('Database initialization failed:', error);
    }
  }
};

// Auto-initialize when imported on server-side
if (typeof window === 'undefined') {
  initializeDatabase();
}
