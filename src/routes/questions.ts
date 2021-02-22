import { Router } from 'express';

import {
  createQuestionController,
  getUnansweredQuestionsListController,
  getFaqListController,
  syncFaqsController,
  incremntFaqStatController,
  excelDownloadUnansweredQuestionsController,
} from '../controllers';

const questionsRouter = Router();

questionsRouter.post('/', createQuestionController);
questionsRouter.get('/unanswered', getUnansweredQuestionsListController);
questionsRouter.get('/unanswered/excel', excelDownloadUnansweredQuestionsController);
questionsRouter.get('/faq', getFaqListController);
questionsRouter.put('/faq/sync', syncFaqsController);
questionsRouter.put('/faq/increment', incremntFaqStatController);

export { questionsRouter };
