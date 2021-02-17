import { Router } from 'express';

import {
  addQuestionAnswerController,
  createQuestionController,
  getUnansweredQuestionsListController,
  getFaqListController,
  syncFaqsController,
} from '../controllers';

const questionsRouter = Router();

questionsRouter.post('/answer', addQuestionAnswerController);
questionsRouter.post('/', createQuestionController);
questionsRouter.get('/unanswered', getUnansweredQuestionsListController);
questionsRouter.get('/faq', getFaqListController);
questionsRouter.put('/faq/sync', syncFaqsController);

export { questionsRouter };
