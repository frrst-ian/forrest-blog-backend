const { sendSuccess } = require("../utils/responses");
const getApiInfo = (req, res) => {
    sendSuccess(res, { message: "Blog API is running" })
}

module.exports = { getApiInfo };