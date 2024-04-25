export class BaseResponse {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success(message, data) {
    return new BaseResponse(true, message, data);
  }

  static error(message, data) {
    return new BaseResponse(false, message, data);
  }
}
