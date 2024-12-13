Github AI model:
https://github.com/marketplace/models/azure-openai/gpt-4o/playground

Setup:
1) frontendAI -> frontendAI -> cmd -> install 
    npm install express dotenv cors @azure-rest/ai-inference @azure/core-auth
    npm list @azure/core-util @azure/core-auth -for verification
    rmdir /s /q node_modules
    npm install
    npm install node express

2) Create .env file with Github Personal Access Token(fine-grained with no expiration) in same location as server.js file

3) Run:
    node server.js
    cmd -> frontend/http-server
    open localhost:8080 in browser
