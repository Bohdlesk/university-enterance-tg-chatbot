import { Router } from 'express';

import createQuestionMiddleware from './createQuestion';
import getUnansweredQuestionsListMiddleware from './getUnansweredQuestionsList';
import getFaqListMiddleware from './getFaqList';
import addAnswerValidatorMiddleware from './addAnswer';

const questionsValidatorsMiddleware = Router();

questionsValidatorsMiddleware.use('/', createQuestionMiddleware);
questionsValidatorsMiddleware.use('/unanswered', getUnansweredQuestionsListMiddleware);
questionsValidatorsMiddleware.use('/faq', getFaqListMiddleware);
questionsValidatorsMiddleware.use('/answer', addAnswerValidatorMiddleware);

export default questionsValidatorsMiddleware;
