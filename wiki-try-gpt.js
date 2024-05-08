const { OpenAI } = require("openai");
const axios = require('axios');
const cheerio = require('cheerio');

const openai = new OpenAI();

async function getWikipediaDescription(url) {
    try {
        // Fetch HTML content of the Wikipedia page
        const response = await axios.get(url);
        const html = response.data;

        // Load HTML content into Cheerio
        const $ = cheerio.load(html);

        // Extract text content from paragraphs
        const paragraphs = [];
        $('p').each((index, element) => {
            paragraphs.push($(element).text());
        });

        // Join paragraphs into a single text content
        const description = paragraphs.join('\n');

        return description;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}



async function generate_summary(text) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test, and tell a joke about my dog Alfie" }],
      model: "gpt-3.5-turbo",
      max_tokens: 1024,
    });
  
    //console.log(completion.choices[0]);
    console.log(completion.choices[0].message.content)
  }
  

  const url = "https://en.wikipedia.org/wiki/Artificial_intelligence";

  getWikipediaDescription(url)
      .then(description => console.log(description))
      .catch(error => console.error("Error:", error));