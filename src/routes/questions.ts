import { Router } from 'express';

import * as constrollers from '../controllers/questions';
import * as validators from '../middlewares/validators/questions';

const questionsRouter = Router();

questionsRouter.post(
  '/',
  validators.createQuestionValidatorMiddleware,
  constrollers.createQuestionController,
);
questionsRouter.get(
  '/unanswered',
  validators.getUnansweredQuestionsListValidatorMiddleware,
  constrollers.getUnansweredQuestionsListController,
);
questionsRouter.get('/unanswered/excel', constrollers.excelDownloadUnansweredQuestionsController);
questionsRouter.delete(
  '/unanswered/clear',
  constrollers.clearUnansweredQuestionsDataBaseController,
);
questionsRouter.get(
  '/faq',
  validators.getFaqListValidatorMiddleware,
  constrollers.getFaqListController,
);
questionsRouter.put('/faq/sync', constrollers.syncFaqsController);
questionsRouter.put(
  '/faq/increment',
  validators.faqCounterIncrementValidatorMiddleware,
  constrollers.incremntFaqStatController,
);

export { questionsRouter };
