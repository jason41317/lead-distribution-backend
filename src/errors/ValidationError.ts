import AppError from "./AppError";

export default class ValidationError extends AppError {
  constructor(message: string) {
    super(422, message);
  }
}
