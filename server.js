import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Import the CORS middleware
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();
const app = express();

// Use CORS middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const token = process.env["GITHUB_TOKEN"];

app.post('/api/query', async (req, res) => {
    const userInput = req.body.question; // Get user input from request body

    const client = new ModelClient(
        "https://models.inference.ai.azure.com",
        new AzureKeyCredential(token)
    );

    try {
        const response = await client.path("/chat/completions").post({
            body: {
                messages: [
                    { role: "system", content: "You are a customer care chatbot for a web application that allow students to apply for volunteering, internships and events and sustainable organisations to display such events hosted by them. If student is a new user, they have to first register and then login. To apply for an event login then select event or internship or volunteering from respective page and enroll. SStudents can search based on location or their interests. Organisations can register themselves by viewing option in home page. They can register, create their own profile and upload available volunteering opportunities, internships and events upcoming in their organisation from which students or other users can enroll. Reply to queries crisply and not too long" },
                    { role: "user", content: userInput }
                ],
                model: "gpt-4o",
                temperature: 0.34,
                max_tokens: 4096,
                top_p: 1
            }
        });

        if (response.status !== "200") {
            throw response.body.error;
        }
        
        res.json({ answer: response.body.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
});

const PORT = process.env.PORT || 10000;
// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
