
class CustomError extends Error{
    constructor(message,details){
        super(message)
        this.details = details
    }
}

exports.AuthenticationError = class AuthenticationError extends CustomError{
    constructor(message,details){
        super(message,details)
        this.code = 401
    }
}
exports.AuthorizationError = class AuthorizationError extends CustomError{
    constructor(message,details){
        super(message,details)
        this.code = 403
    }
}
exports.ServerError = class ServerError extends CustomError{
    constructor(message,details){
        super(message,details)
        this.code = 500
    }
}