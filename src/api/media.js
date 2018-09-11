import request from "./util.js";

export function listMedia(params) {
    return request({
        url: "/console/media",
        method: "get",
        params
    });
}

export function detailMedia(id) {
    return request({
        url: "/console/media/" + id,
        method: "get"
    });
}

export function uploadArticle(data) {
    return request({
        url: "/console/media",
        method: "post",
        data
    });
}
