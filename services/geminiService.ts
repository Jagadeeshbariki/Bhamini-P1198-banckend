
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  async generateFullBackendProject(projectName: string) {
    const cloudinaryConfig = {
      cloudName: 'dbohmpxko',
      apiKey: '829126349486959',
      apiSecret: 'WX3TeoeR9rnpHmxPt3qADRAglwo'
    };

    const mongoUri = 'mongodb+srv://Jagadeesh:P1198@cluster0.zfagv3c.mongodb.net/?appName=Cluster0';

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a production-ready Node.js Express backend project for '${projectName}'. 
      
      CRITICAL SECURITY & DEPLOYMENT REQUIREMENTS:
      1. Include 'cors' middleware configured to allow requests from your frontend URL.
      2. Use 'helmet' for security headers.
      3. Use 'express-rate-limit' on the /auth/login route.
      4. Database: MongoDB via Mongoose. Use: ${mongoUri}
      5. Media: Cloudinary. Use Cloud Name: ${cloudinaryConfig.cloudName}, API Key: ${cloudinaryConfig.apiKey}, API Secret: ${cloudinaryConfig.apiSecret}
      6. Authentication: JWT with bcrypt password hashing.
      7. Structure:
         - server.js (main entry, uses process.env.PORT)
         - config/db.js (mongoose connection)
         - config/cloudinary.js (cloudinary config)
         - models/ (User.js, Image.js)
         - routes/ (auth.js, images.js)
         - controllers/ (authController.js, imageController.js)
         - middleware/ (authMiddleware.js)
         - .env (containing the real credentials provided above)
      8. Documentation: A detailed README.md for deployment on Render.com or Railway.app.
      
      Return a JSON object with 'files' (array of {path, content, language}) and 'summary' (markdown string).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            files: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  path: { type: Type.STRING },
                  content: { type: Type.STRING },
                  language: { type: Type.STRING }
                },
                required: ["path", "content", "language"]
              }
            },
            summary: { type: Type.STRING }
          },
          required: ["files", "summary"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async analyzeImageMetadata(imageUrl: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { text: "Analyze this image and provide a JSON list of tags and a brief description for a database entry." },
          { inlineData: { mimeType: 'image/jpeg', data: imageUrl.split(',')[1] } }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    return JSON.parse(response.text);
  }
};
