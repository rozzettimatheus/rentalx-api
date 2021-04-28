export class AppError {
  public readonly message: string

  public readonly statusCode: number

  // include a datatype HTTPStatusCodes
  constructor(message: string, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}
