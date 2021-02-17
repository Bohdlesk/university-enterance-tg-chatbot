import { Request, Response } from 'express';
import dialogflow from '@google-cloud/dialogflow';

import { google } from '@google-cloud/dialogflow/build/protos/protos';
import { dialogflowProjectId } from '../../const';
import { FAQ } from '../../models';
import IIntent = google.cloud.dialogflow.v2beta1.IIntent;
import IPart = google.cloud.dialogflow.v2beta1.Intent.TrainingPhrase.IPart;

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

    const faqs = intents.filter(isFaq)
      .map(filterQuestions);

    await FAQ.bulkCreate(faqs, {
      updateOnDuplicate: ['question', 'answer'],
    });

    return res.status(200).json({
      status: 'success',
      faqs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

function isFaq(intent: IIntent): boolean {
  return intent.action === '';
}

function filterQuestions(intent: IIntent) {
  return {
    name: intent.displayName,
    question: intent.trainingPhrases?.[0].parts
      ?.reduce((question: string, part: IPart) => question + part.text, ''),
    answer: intent.messages?.[0].text?.text?.[0],
  };
}
