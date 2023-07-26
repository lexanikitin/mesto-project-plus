class ErrorWithCode extends Error {
  statusCode: number;

  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
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

  static unauthorized() {
    return new ErrorWithCode(401, "Необходима авторизация");
  }

  static conflict() {
    return new ErrorWithCode(409, "Конфликт");
  }
}

export default ErrorWithCode;
