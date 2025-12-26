
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
      
      CRITICAL DEPLOYMENT REQUIREMENTS FOR RENDER:
      1. Entry Point: Create 'server.js'. It must use const PORT = process.env.PORT || 5000;
      2. Dependencies: Create a 'package.json' that includes: 
         express, mongoose, cloudinary, dotenv, cors, helmet, bcryptjs, jsonwebtoken.
      3. Scripts: Set "start": "node server.js" in package.json.
      4. Database: MongoDB via Mongoose. Connection string: ${mongoUri}
      5. Media: Cloudinary. Use Cloud Name: ${cloudinaryConfig.cloudName}, API Key: ${cloudinaryConfig.apiKey}, API Secret: ${cloudinaryConfig.apiSecret}
      
      FILE LIST TO GENERATE:
      - package.json
      - server.js (Main logic)
      - .env (Environment variables)
      - config/db.js
      - config/cloudinary.js
      - models/User.js
      - models/Image.js
      - routes/auth.js
      - routes/images.js
      - controllers/authController.js
      - controllers/imageController.js
      - middleware/authMiddleware.js
      
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
