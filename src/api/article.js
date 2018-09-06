import request from "./util.js";

export function listArticle(params) {
    return request({
        url: "/console/article",
        method: "get",
        params
    });
}

export function detailArticle(id) {
    return request({
        url: "/console/article/" + id,
        method: "get"
    });
}

export function newArticle(data) {
    return request({
        url: "/console/article",
        method: "post",
        data
    });
}

export function updateArticle(id, data) {
    return request({
        url: "/console/article/" + id,
        method: "put",
        data
    }); 
}

export function deleteArticle(id) {
    return request({
        url: "/console/article/" + id,
        method: "patch",
        data: {
            status: 3
        }
    });
}

export function restoreArticle(id) {
    return request({
        url: "/console/article/" + id,
        method: "patch",
        data: {
            status: 2
        }
    });
}
