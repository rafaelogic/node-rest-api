module.exports = (req, res, next) => {
    console.log(req.session);
    if (req.session.auth) {
        return res.status(200).json({
            message: 'Already logged in.'
        });
    }
    next();
}