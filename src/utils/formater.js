exports.metaPagination = (page, perPage, totalData, totalDataInPage) => {
    let totalPage = 0
    if (totalDataInPage < perPage && page == 1) {
        totalPage = 1
    } else if ((totalData % perPage) > 0) {
        totalPage = Math.floor(totalData / perPage) + 1
    } else { 
        totalPage = totalData / perPage
    }

    return {
        page: page, 
        limit: perPage,
        totalPages: totalPage,
        totalResults: totalDataInPage,
        totalData: totalData
    }
}