class HttpError extends Error {
    constructor(mensaje, errorCode) {
        super(mensaje);
        this.code = errorCode;
    }
}

export default HttpError;