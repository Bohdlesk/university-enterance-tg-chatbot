import { ValidationError, ValidationErrorItem } from 'joi';

interface IValidationErrors {
  queryErrors?: ValidationError | undefined;
  paramsErrors?: ValidationError | undefined;
  bodyErrors?: ValidationError | undefined;
}

interface IValidationErrorsResponse {
  status: string;
  message: string;
  error: string;
}

export default (errors: IValidationErrors): IValidationErrorsResponse => ({
  status: 'error',
  message: 'Request validation error',
  error: Object.entries(errors).map(([key, value]) => {
    if (value) {
      const messageHeader = `${key.charAt(0).toUpperCase()}${key.slice(1, -6)} errors`;
      const errorMessages = value.details
        .map((item: ValidationErrorItem) => item.message.replace(/"/g, "'"))
        .join(', ');
      return `${messageHeader}: ${errorMessages}`;
    }
    return null;
  }).filter((message) => message).join('; '),
});
