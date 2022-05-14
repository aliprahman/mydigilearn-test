
exports.pagination = (req, res, next) => {
    const perPage = (req.query.perPage !== undefined && req.query.perPage > 0) ? parseInt(req.query.perPage) : 10
    const page = (req.query.page !== undefined && req.query.page != "") ? parseInt(req.query.page) : 1
    const offset = (page == 1) ? 0 : (parseInt(page) - 1) * perPage
    const sortBy = (req.query.sortBy !== undefined && req.query.sortBy !== "") ? req.query.sortBy : "createdAt"
    const sortType = (req.query.sortType !== undefined && req.query.sortType !== "") ? req.query.sortType : 'desc'

    req.page = page;
    req.offset = offset
    req.perPage = perPage;
    req.sortBy = sortBy;
    req.sortType = sortType;

    next();
};
