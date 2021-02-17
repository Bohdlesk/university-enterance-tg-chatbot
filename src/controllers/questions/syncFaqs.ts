import { Request, Response } from 'express';
import dialogflow from '@google-cloud/dialogflow';

import { dialogflowProjectId } from '../../const';
import { FAQ } from '../../models';

const intentsClient = new dialogflow.IntentsClient();

const listIntents = async () => {
  const projectAgentPath = intentsClient.agentPath(dialogflowProjectId);

  const request = {
    parent: projectAgentPath,
    intentView: 1,
  };

  const [response] = await intentsClient.listIntents(request);
  return response;
};

export default async (req: Request, res: Response): Promise<Response> => {
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

    return res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
