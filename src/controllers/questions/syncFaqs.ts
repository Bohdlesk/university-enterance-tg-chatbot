/* eslint-disable no-undef */

import { Request, Response } from 'express';
import dialogflow from '@google-cloud/dialogflow';
import { google } from '@google-cloud/dialogflow/build/protos/protos';

import { dialogflowProjectId } from '../../const';
import { FAQ, IFaq } from '../../models';
import IIntent = google.cloud.dialogflow.v2.IIntent;
import IPart = google.cloud.dialogflow.v2.Intent.TrainingPhrase.IPart;
import IntentView = google.cloud.dialogflow.v2.IntentView;

const intentsClient = new dialogflow.IntentsClient();
const dialogflowFaqTag = 'faq';

const isFaq = (intent: IIntent): boolean => intent.action === dialogflowFaqTag;

const filterQuestions = (intent: IIntent) => ({
  name: intent.displayName,
  question: intent.trainingPhrases
    ?.slice(-1)[0]
    .parts?.reduce((question: string, part: IPart) => question + part.text, ''),
  answer: intent.messages?.[0].text?.text?.[0],
});

const listIntents = async () => {
  const projectAgentPath = intentsClient.agentPath(dialogflowProjectId);

  const request = {
    parent: projectAgentPath,
    intentView: IntentView.INTENT_VIEW_FULL,
  };

  const [response] = await intentsClient.listIntents(request);
  return response;
};

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const intents = await listIntents();
    const faqs = intents.filter(isFaq).map(filterQuestions) as IFaq[];

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
