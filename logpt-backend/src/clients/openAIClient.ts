import { OpenAI } from 'openai';
import { requireEnvVar } from '../utils';

const apiKey = requireEnvVar('OPENAI_SECRET_KEY');
console.log(apiKey);
const openAIClient = new OpenAI({
  apiKey: apiKey,
});

export const sendToOpenAI = async (prompt: string, log: string) => {
  // const usage = await openAIClient.usage.retrieve();

  const gptResponse = await openAIClient.chat.completions.create({
    model: 'gpt-3.5-turbo', // or your preferred model
    messages: [
      {
        role: 'user',
        content: `Question: ${prompt}. The related log file output is: ${log}. Can you generate clean answer including the log file?`,
      },
    ],
    max_tokens: 150,
  });

  return gptResponse.choices[0].message;
};
