import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { INPUT_MAX_LENGTH } from '../../constants';

const openai = new OpenAI({
  apiKey: `4a5d98ed28e74ef081ce33ba3e140bdf`,
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const input = request.query.prompt?.toString();

  if (!input) {
    return response
      .status(400)
      .json({ error: 'Please provide a prompt query  ಠ_ಠ' });
  } else if (input.length < 5) {
    return response.status(400).json({ error: '( ͡° ͜ʖ ͡°) Prompt too short' });
  } else if (input.length > INPUT_MAX_LENGTH) {
    return response.status(400).json({
      error: `Sorry, current limit is ${INPUT_MAX_LENGTH} characters per request. へ‿(ツ)‿ㄏ`,
    });
  } else {
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Transform the following news headlines into a conclusion.\n
      Example:\n
      Input: Tomorrow will be election. The electricity will be shut down from 16 to 20. Zoo will have open doors today.\n
      Conclusion: Make an informed decision on your vote, prepare for the power outage, and enjoy a free visit to the zoo if you can.\n
      Input: ${input}\n
      Conclusion:`,
      max_tokens: 500,
      temperature: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
      stop: ['\n'],
    });

    const conclusion = completion.choices[0].text;
    return response
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ conclusion });
  }
}
