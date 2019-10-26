const request = require("request-promise").defaults({ json: true });
const { HOST_API = "https://kma-schedule-api.herokuapp.com" } = process.env;

exports.register = function(studentCode, password) {
    const options = {
        url: `${HOST_API}/users`,
        form: {
            studentCode,
            password,
        },
        method: "POST",
    }
    return request(options);
}

exports.login = function(studentCode, password) {
    const options = {
        url: `${HOST_API}/users/login`,
        form: {
            studentCode,
            password,
        },
        method: "POST",
    }
    return request(options);
}
exports.checkToken = function(bearerToken) {
    const options = {
        url: `${HOST_API}/users/me`,
        auth: {
            bearer: bearerToken,
        },
        method: "GET",
    }
    return request(options);
}
exports.showSemester = function(bearerToken) {
    const options = {
        url: `${HOST_API}/schedules/me/semesters`,
        auth: {
            bearer: bearerToken,
        },
        method: "GET",
    }
    return request(options);
}
exports.download = function(bearerToken, drpSemester) {
    const options = {
        url: `${HOST_API}/schedules/me/save`,
        auth: {
            bearer: bearerToken,
        },
        form: {
            drpSemester
        },
        method: "POST",
    }
    return request(options);
}
exports.search = function(bearerToken, days = []) {
    const options = {
        url: `${HOST_API}/schedules/me/search`,
        auth: {
            bearer: bearerToken,
        },
        body: {
            days
        },
        method: "POST",
    }
    return request(options);
}