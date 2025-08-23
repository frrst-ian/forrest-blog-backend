function getApiInfo(req, res) {
    res.json({ message: "Blog API is running" });
}

module.exports = { getApiInfo };