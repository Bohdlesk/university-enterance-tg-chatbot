import { Router } from 'express';

import {
  addQuestionAnswerController,
  createQuestionController,
  getUnansweredQuestionsListController,
  getFaqListController,
  syncFaqsController,
  incremntFaqStatController,
} from '../controllers';

const questionsRouter = Router();

questionsRouter.post('/answer', addQuestionAnswerController);
questionsRouter.post('/', createQuestionController);
questionsRouter.get('/unanswered', getUnansweredQuestionsListController);
questionsRouter.get('/faq', getFaqListController);
questionsRouter.put('/faq/sync', syncFaqsController);
questionsRouter.put('/faq/increment', incremntFaqStatController);

export { questionsRouter };
