const ApiError = require("../error/ApiError");
const { cipherData } = require("../middleware/CipherDataMiddleware");

class FundraiseController {

    async addFundraise(req, res, next) {

        const {type, whom, kind, description, target_sum} = req.body;
        const files = req.files;
        const accessToken = req.cookies.accessToken;

        try {
            const createdAt = new Date();

            if (!type || !whom || !kind || !description) {
                return next(ApiError.badRequest("Не введено дані!"));
            }
            if (!files || files.length === 0) {
                return next(ApiError.badRequest("Додайте хоча б одне фото!"));
            }

            let chosenType = 0
            if (type === "Допомога ЗСУ") {
                chosenType = 0;
            } else {
                chosenType = 1;
            }



        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateFundraise(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async closeFundraise(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async deleteFundraise(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getFundraises(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getFundraise(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new FundraiseController();