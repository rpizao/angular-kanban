export class BusinessError extends Error {

  httpStatus?: number = 404;

  constructor(message?: string) {
    super(message);
    this.name = BusinessError.name;
    Object.setPrototypeOf(this, BusinessError.prototype);
  }
}
