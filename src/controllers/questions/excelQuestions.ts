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
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet('unanswered_questions');

      worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Question', key: 'question', width: 100 },
        { header: 'Created', key: 'createdAt', width: 25 },
      ] as excel.Column[];

      worksheet.addRows(questions);
      const createdAtCol = worksheet.getColumn(3);
      createdAtCol.eachCell((cell) => {
        // eslint-disable-next-line no-param-reassign
        cell.numFmt = 'yyyy-mm-dd\\ hh:mm:ss';
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=unanswered_questions.xlsx',
      );

      await workbook.xlsx.write(res);
      res.status(200).json({
        ststus: 'success',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
