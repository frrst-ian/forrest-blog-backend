const sendError = (res, status, message) => {
    return res.status(status).json({ error: message });
};

const sendSuccess = (res, data, status = 200) => {
    return res.status(status).json(data);
};

module.exports = { sendError, sendSuccess };