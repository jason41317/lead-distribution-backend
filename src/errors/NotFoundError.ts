import AppError from "./AppError";

export default class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(404, message);
  }
}
