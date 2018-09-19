import request from "./util.js";

export function listCollect(params) {
    return request({
        url: "/console/collect",
        method: "get",
        params
    });
}

export function detailCollect(id) {
    return request({
        url: "/console/collect/" + id,
        method: "get"
    });
}

export function newCollect(data) {
    return request({
        url: "/console/collect",
        method: "post",
        data
    });
}

export function updataCollect(id, data) {
    return request({
        url: "/console/collect/" + id,
        method: "put",
        data
    });
}

export function deleteCollect(id) {
    return request({
        url: "/console/collect/" + id,
        method: "patch",
        data: {
            status: 3
        }
    });
}

export function restoreCollect(id) {
    return request({
        url: "/console/article/" + id,
        method: "patch",
        data: {
            status: 2
        }
    });
}
