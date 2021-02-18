import { Router } from 'express';

import createQuestionMiddleware from './createQuestion';
import getUnansweredQuestionsListMiddleware from './getUnansweredQuestionsList';
import getFaqListMiddleware from './getFaqList';
import faqCounterIncrementMiddleware from './faqCounterIncrement';

const questionsValidatorsMiddleware = Router();

questionsValidatorsMiddleware.use('/', createQuestionMiddleware);
questionsValidatorsMiddleware.use('/unanswered', getUnansweredQuestionsListMiddleware);
questionsValidatorsMiddleware.use('/faq', getFaqListMiddleware);
questionsValidatorsMiddleware.use('/faq/increment', faqCounterIncrementMiddleware);

export default questionsValidatorsMiddleware;
