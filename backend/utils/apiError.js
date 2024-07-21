class APIError extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}
export class BadRequestError extends APIError {
    constructor(message) {
        super(400 ,message)
    }
}

export class NotFoundError extends APIError {
    constructor(message) {
        super(404, message)
    }
}

export class ConflictError extends APIError {
    constructor(message) {
        super(499, message)
    }
}
export class UnprocessableContentError extends APIError {
    constructor(message) {
        super(422, message)
    }
}

export class UnexpectedError extends APIError {
    constructor(message) {
        super(500, message)
    }
}