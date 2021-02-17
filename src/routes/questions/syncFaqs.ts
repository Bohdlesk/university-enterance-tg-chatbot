import express from 'express';
import dialogflow from '@google-cloud/dialogflow';
import dotenv from 'dotenv';
import fs from 'fs';

// import { FAQ } from '../../models';

dotenv.config();
const projectId = 'ismbot-irio';
const intentsClient = new dialogflow.IntentsClient();

async function listIntents() {
  const projectAgentPath = intentsClient.agentPath(projectId);

  const request = {
    parent: projectAgentPath,
  };

  // Send the request for listing intents.
  const [response] = await intentsClient.listIntents(request);
  fs.writeFileSync('../response.json', JSON.stringify(response));
  console.log('response', response);
}

const syncFaqsRouter = express.Router();

syncFaqsRouter.get('/', async (req, res) => {
  try {
    await listIntents();
    res.status(200).end();
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { syncFaqsRouter };
