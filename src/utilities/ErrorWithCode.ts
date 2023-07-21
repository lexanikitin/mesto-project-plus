class ErrorWithCode extends Error {
  statusCode: number;

  message: string;

  constructor(status: number, message: string) {
    super();
    this.statusCode = status;
    this.message = message;
  }

  static badRequest() {
    return new ErrorWithCode(400, "Неверный запрос");
  }

  static notFound() {
    return new ErrorWithCode(404, "Ресурс не найден");
  }

  static internalServerError() {
    return new ErrorWithCode(500, "Внутренняя ошибка сервера");
  }
}

export default ErrorWithCode;