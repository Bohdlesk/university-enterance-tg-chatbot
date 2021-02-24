import { Router } from 'express';

import * as controllers from '../controllers/questions';
import * as validators from '../middlewares/validators/questions';

const questionsRouter = Router();

questionsRouter.post(
  '/',
  validators.createQuestionValidatorMiddleware,
  controllers.createQuestionController,
);
questionsRouter.get(
  '/unanswered',
  validators.getUnansweredQuestionsListValidatorMiddleware,
  controllers.getUnansweredQuestionsListController,
);
questionsRouter.get('/unanswered/excel', controllers.excelDownloadUnansweredQuestionsController);
questionsRouter.delete(
  '/unanswered/clear',
  controllers.clearUnansweredQuestionsDataBaseController,
);
questionsRouter.get(
  '/faq',
  validators.getFaqListValidatorMiddleware,
  controllers.getFaqListController,
);
questionsRouter.put('/faq/sync', controllers.syncFaqsController);
questionsRouter.put(
  '/faq/increment',
  validators.faqCounterIncrementValidatorMiddleware,
  controllers.incremntFaqStatController,
);

export { questionsRouter };
