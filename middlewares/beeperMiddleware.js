export function idIsRequireMiddleware(req, res, next) {
    if (!req.params.id) {
        res.status(400).json({ message: "this is message from middleware, please enter the id of the beeper at the params of url" });
    }
    next();
}
