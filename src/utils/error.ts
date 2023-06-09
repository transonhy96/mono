import { HttpException, HttpStatus } from "@nestjs/common";
import { AppError } from "src/configs/constants";
export const get_http_exeption = (status: HttpStatus, msg?: string, error = null) => {
    return new HttpException({
        status,
        error: error ? error.msg : msg,
    }, status)
}
export const get_app_exeption = (err: AppError): HttpException => {
    switch (err) {
        case AppError.EMAIL_EXISTED:
            return get_http_exeption(HttpStatus.FORBIDDEN, "An user with that email is already existed");
        case AppError.USER_NOT_EXISTED:
            return get_http_exeption(HttpStatus.FORBIDDEN, "Email is not existed");
        case AppError.INCORRECT_PASSWORD:
            return get_http_exeption(HttpStatus.FORBIDDEN, "Incorrect password");
        case AppError.GENERIC:
            return get_http_exeption(HttpStatus.BAD_REQUEST, "Invalid credentials");
        default:
            return get_http_exeption(HttpStatus.FORBIDDEN, "Unspecified");
    }
}