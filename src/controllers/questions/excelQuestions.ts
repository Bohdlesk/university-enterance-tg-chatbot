import { Request, Response } from 'express';
import excel from 'exceljs';
import { UnansweredQuestion, IUnansweredQuestions } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const questions: IUnansweredQuestions[] = await UnansweredQuestion.findAll();
    if (questions.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Questions list is empty',
      });
    } else {
      const questionsKievDateTime = questions.map((questionItem) => ({
        id: questionItem.id,
        question: questionItem.question,
        createdAt: questionItem.createdAt.toLocaleString('uk-UA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));

      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('unanswered_questions');

      worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Question', key: 'question', width: 100 },
        {
          header: 'Created',
          key: 'createdAt',
          width: 25,
        },
      ] as excel.Column[];

      worksheet.addRows(questionsKievDateTime);

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=unanswered_questions.xlsx',
      );

      await workbook.xlsx.write(res);
      res.status(200).end();
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
