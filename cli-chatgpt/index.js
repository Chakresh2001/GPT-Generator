require('dotenv').config();
const openai = require("openai")

const key = process.env.OPENAI_API_KEY
console.log(key)
const openaiClient = new openai({ key: key });
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('Ask a question: ', (userInput) => {
    
    openaiClient.completions.create({
      prompt: userInput,
      max_tokens: 50, 
      model: "text-davinci-002", 
    })
      .then((response) => {
        // console.log(response)
        console.log('AI Response:', response.choices[0].text);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        rl.close();
      });
  });