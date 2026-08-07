import AppError from "./AppError.js";

export default class ValidationError extends AppError {
  constructor(message: string) {
    super(422, message);
  }
}
