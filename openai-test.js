const { OpenAI } = require("openai");

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test, and tell a joke about my dog Alfie" }],
    model: "gpt-3.5-turbo",
    max_tokens: 1024,
  });

  //console.log(completion.choices[0]);
  console.log(completion.choices[0].message.content)
}

main();