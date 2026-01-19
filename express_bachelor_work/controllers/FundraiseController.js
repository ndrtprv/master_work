const ApiError = require("../error/ApiError");

class FundraiseController {

    async addFundraise(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateFundraise(req, res) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteFundraise(req, res) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getFundraises(req, res) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getFundraise(req, res) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new FundraiseController();