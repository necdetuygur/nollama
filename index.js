import { Ollama } from "ollama";
import readline from "readline";
import { select } from "@inquirer/prompts";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
let OLLAMA_MODEL = process.env.OLLAMA_MODEL || "gemma3:1b";
const OLLAMA_SYSTEM = process.env.OLLAMA_SYSTEM || "Your name is Neu from now on. If anyone asks your name, you will say Neu!";
const ollama = new Ollama({ host: OLLAMA_HOST });
const messages = [];
messages.push({ role: "system", content: OLLAMA_SYSTEM });

try {
  const ais = (await ollama.list()).models.map((item) => ({
    name: item.name,
    value: item.name,
  }));
  OLLAMA_MODEL = await select({
    message: "Select AI model",
    choices: [...ais],
  });
} catch (error) {}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", async (input) => {
  try {
    messages.push({ role: "user", content: input });

    const response = await ollama.chat({
      model: OLLAMA_MODEL,
      messages: messages,
      stream: true,
    });

    let agentMessage = "";
    for await (const part of response) {
      agentMessage += part.message.content;
      process.stdout.write(part.message.content);
    }
    messages.push({ role: "agent", content: agentMessage });

    process.stdout.write("\n\n> ");
  } catch (error) {
    console.error("Error during chat:", error);
  }
});

console.log(
  'Type your message and press "Enter".\nUse "CTRL + C" to exit the program.',
);
process.stdout.write("\n> ");
