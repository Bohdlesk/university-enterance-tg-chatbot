import { Router } from 'express';
import { createQuestionRouter } from './createQuestion';
import { getUnansweredQuestionsListRouter } from './getUnansweredQuestionsList';
import { getFaqListRouter } from './getFaqList';
import { addQuestionAnswer } from './addAnswer';
import { syncFaqsRouter } from './syncFaqs';

const questionsRouter = Router();

questionsRouter.use('/', createQuestionRouter);
questionsRouter.use('/unanswered', getUnansweredQuestionsListRouter);
questionsRouter.use('/faq', getFaqListRouter);
questionsRouter.use('/faq/sync', syncFaqsRouter);
questionsRouter.use('/answer', addQuestionAnswer);

export { questionsRouter };
