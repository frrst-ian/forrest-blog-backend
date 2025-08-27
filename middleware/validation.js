const validateId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
    }
    req.validId = id;
    next();
};

module.exports = { validateId };