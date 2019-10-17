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

exports.showSemester = function(bearerToken) {
    const options = {
        url: `${HOST_API}/schedules/semesters`,
        auth: {
            bearer: bearerToken,
        },
        method: "GET",
    }
}