import { Request, Response } from 'express';
import excel from 'exceljs';
import { UnansweredQuestion, IUnansweredQuestions } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const questions: IUnansweredQuestions[] = await UnansweredQuestion.findAll();
    if (questions.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Questions list is empty',
      });
    }

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
    return res.status(200).json({
      ststus: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
