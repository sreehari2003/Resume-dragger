export class AppError extends Error {
    statusCode: string;

    status: string;

    isOperationol: boolean;

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperationol = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
