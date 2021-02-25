import { Request, Response } from 'express';
import excel from 'exceljs';
import { UnansweredQuestion, IUnansweredQuestions } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const questions: IUnansweredQuestions[] = await UnansweredQuestion.findAll();
    if (questions.length === 0) throw new Error('Questions lis is empty');

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('unanswered_questions');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Question', key: 'question', width: 100 },
      { header: 'Created', key: 'createdAt', width: 25 },
    ] as excel.Column[];

    worksheet.addRows(questions);

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
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
