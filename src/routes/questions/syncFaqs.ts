import express from 'express';
import dialogflow from '@google-cloud/dialogflow';
import dotenv from 'dotenv';
import fs from 'fs';

import { FAQ } from '../../models';

dotenv.config();
// const projectId = 'ismbot-irio';
const projectId = 'chatbot-app-agent-kxlc';
const intentsClient = new dialogflow.IntentsClient();

const listIntents = async () => {
  const projectAgentPath = intentsClient.agentPath(projectId);

  const request = {
    parent: projectAgentPath,
    intentView: 1,
  };

  // Send the request for listing intents.
  const [response] = await intentsClient.listIntents(request);
  fs.writeFileSync('../response.json', JSON.stringify(response));
  return response;
};

const syncFaqsRouter = express.Router();

syncFaqsRouter.get('/', async (req, res) => {
  try {
    const intents = await listIntents();

    const faqs = intents
      .filter((intent) => intent.action === 'faq')
      .map((intent: any) => ({
        name: intent.displayName,
        question: intent.trainingPhrases[0].parts[0].text,
        answer: intent.messages[0].text?.text[0],
      }));

    await FAQ.bulkCreate(faqs, {
      updateOnDuplicate: ['question', 'answer'],
    });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { syncFaqsRouter };
