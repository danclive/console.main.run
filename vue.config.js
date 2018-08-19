module.exports = {
  baseUrl:
    process.env.NODE_ENV === "production" ? "https://cdn.danclive.com/" : "/",
  productionSourceMap: false
};
