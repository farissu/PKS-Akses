"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/company";
exports.ids = ["pages/api/company"];
exports.modules = {

/***/ "(api)/./src/erp/Helpers/config.js":
/*!***********************************!*\
  !*** ./src/erp/Helpers/config.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CREATE_OTP_API_KEY\": () => (/* binding */ CREATE_OTP_API_KEY),\n/* harmony export */   \"CREATE_OTP_URL\": () => (/* binding */ CREATE_OTP_URL),\n/* harmony export */   \"MAIL_FROM\": () => (/* binding */ MAIL_FROM),\n/* harmony export */   \"MAIL_HOST\": () => (/* binding */ MAIL_HOST),\n/* harmony export */   \"MAIL_PASSWORD\": () => (/* binding */ MAIL_PASSWORD),\n/* harmony export */   \"MAIL_PORT\": () => (/* binding */ MAIL_PORT),\n/* harmony export */   \"MAIL_USERNAME\": () => (/* binding */ MAIL_USERNAME),\n/* harmony export */   \"URL_API_\": () => (/* binding */ URL_API_),\n/* harmony export */   \"URL_API_DEV\": () => (/* binding */ URL_API_DEV)\n/* harmony export */ });\n// Email\nconst MAIL_HOST = process.env.VITE_MAIL_HOST;\nconst MAIL_USERNAME = process.env.VITE_MAIL_USERNAME;\nconst MAIL_PASSWORD = process.env.VITE_MAIL_PASSWORD;\nconst MAIL_PORT = process.env.VITE_MAIL_PORT;\nconst MAIL_FROM = process.env.VITE_MAIL_FROM;\nconst CREATE_OTP_URL = process.env.VITE_CREATE_OTP_URL;\nconst CREATE_OTP_API_KEY = process.env.VITE_CREATE_OTP_API_KEY;\nconst URL_API_DEV = \"https://cf3-cnt-be-dev3.cnt.id/crowdfunding/\";\nconst URL_API_ = \"https://cf2-cnt-be-dev1.cnt.id/cf2/\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvZXJwL0hlbHBlcnMvY29uZmlnLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDRCxNQUFNQSxZQUFZQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7QUFDNUMsTUFBTUMsZ0JBQWdCSCxRQUFRQyxHQUFHLENBQUNHLGtCQUFrQjtBQUNwRCxNQUFNQyxnQkFBZ0JMLFFBQVFDLEdBQUcsQ0FBQ0ssa0JBQWtCO0FBQ3BELE1BQU1DLFlBQVlQLFFBQVFDLEdBQUcsQ0FBQ08sY0FBYztBQUM1QyxNQUFNQyxZQUFZVCxRQUFRQyxHQUFHLENBQUNTLGNBQWM7QUFFNUMsTUFBTUMsaUJBQWlCWCxRQUFRQyxHQUFHLENBQUNXLG1CQUFtQixDQUFDO0FBQ3ZELE1BQU1DLHFCQUFxQmIsUUFBUUMsR0FBRyxDQUFDYSx1QkFBdUIsQ0FBQztBQUUvRCxNQUFNQyxjQUFjLCtDQUErQztBQUNuRSxNQUFNQyxXQUFXLHNDQUFzQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NmX2V4dC8uL3NyYy9lcnAvSGVscGVycy9jb25maWcuanM/MDQzZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFbWFpbFxuZXhwb3J0IGNvbnN0IE1BSUxfSE9TVCA9IHByb2Nlc3MuZW52LlZJVEVfTUFJTF9IT1NUXG5leHBvcnQgY29uc3QgTUFJTF9VU0VSTkFNRSA9IHByb2Nlc3MuZW52LlZJVEVfTUFJTF9VU0VSTkFNRVxuZXhwb3J0IGNvbnN0IE1BSUxfUEFTU1dPUkQgPSBwcm9jZXNzLmVudi5WSVRFX01BSUxfUEFTU1dPUkRcbmV4cG9ydCBjb25zdCBNQUlMX1BPUlQgPSBwcm9jZXNzLmVudi5WSVRFX01BSUxfUE9SVFxuZXhwb3J0IGNvbnN0IE1BSUxfRlJPTSA9IHByb2Nlc3MuZW52LlZJVEVfTUFJTF9GUk9NXG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfT1RQX1VSTCA9IHByb2Nlc3MuZW52LlZJVEVfQ1JFQVRFX09UUF9VUkw7XG5leHBvcnQgY29uc3QgQ1JFQVRFX09UUF9BUElfS0VZID0gcHJvY2Vzcy5lbnYuVklURV9DUkVBVEVfT1RQX0FQSV9LRVk7XG5cbmV4cG9ydCBjb25zdCBVUkxfQVBJX0RFViA9IFwiaHR0cHM6Ly9jZjMtY250LWJlLWRldjMuY250LmlkL2Nyb3dkZnVuZGluZy9cIjtcbmV4cG9ydCBjb25zdCBVUkxfQVBJXyA9IFwiaHR0cHM6Ly9jZjItY250LWJlLWRldjEuY250LmlkL2NmMi9cIjsiXSwibmFtZXMiOlsiTUFJTF9IT1NUIiwicHJvY2VzcyIsImVudiIsIlZJVEVfTUFJTF9IT1NUIiwiTUFJTF9VU0VSTkFNRSIsIlZJVEVfTUFJTF9VU0VSTkFNRSIsIk1BSUxfUEFTU1dPUkQiLCJWSVRFX01BSUxfUEFTU1dPUkQiLCJNQUlMX1BPUlQiLCJWSVRFX01BSUxfUE9SVCIsIk1BSUxfRlJPTSIsIlZJVEVfTUFJTF9GUk9NIiwiQ1JFQVRFX09UUF9VUkwiLCJWSVRFX0NSRUFURV9PVFBfVVJMIiwiQ1JFQVRFX09UUF9BUElfS0VZIiwiVklURV9DUkVBVEVfT1RQX0FQSV9LRVkiLCJVUkxfQVBJX0RFViIsIlVSTF9BUElfIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/erp/Helpers/config.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/company/index.tsx":
/*!*****************************************!*\
  !*** ./src/pages/api/company/index.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _erp_Helpers_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/erp/Helpers/config */ \"(api)/./src/erp/Helpers/config.js\");\n\nasync function handler(_req, res) {\n    const host = _req.headers.host;\n    var response = await fetch(_erp_Helpers_config__WEBPACK_IMPORTED_MODULE_0__.URL_API_DEV + \"res_company/get\", {\n        method: \"GET\",\n        headers: {\n            \"x-forwarded-for\": String(host)\n        }\n    });\n    var company = await response.json();\n    // const company = await getCompany();\n    return res.status(200).json({\n        company\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2NvbXBhbnkvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQW1EO0FBSXBDLGVBQWVDLFFBQzVCQyxJQUFvQixFQUNwQkMsR0FBb0IsRUFDcEI7SUFDQSxNQUFNQyxPQUFPRixLQUFLRyxPQUFPLENBQUNELElBQUk7SUFDNUIsSUFBSUUsV0FBVyxNQUFNQyxNQUNuQlAsNERBQVdBLEdBQUMsbUJBQ1o7UUFDRVEsUUFBUTtRQUNSSCxTQUFTO1lBQ1AsbUJBQW1CSSxPQUFPTDtRQUM1QjtJQUVGO0lBRUYsSUFBSU0sVUFBVSxNQUFNSixTQUFTSyxJQUFJO0lBRWpDLHNDQUFzQztJQUV0QyxPQUFPUixJQUFJUyxNQUFNLENBQUMsS0FBS0QsSUFBSSxDQUFDO1FBQ3hCRDtJQUNGO0FBRU4sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NmX2V4dC8uL3NyYy9wYWdlcy9hcGkvY29tcGFueS9pbmRleC50c3g/MzU5OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVUkxfQVBJX0RFViB9IGZyb20gXCJAL2VycC9IZWxwZXJzL2NvbmZpZ1wiO1xuaW1wb3J0IHsgZ2V0Q29tcGFueSB9IGZyb20gXCJAL2VycC9jb21wYW55XCI7XG5pbXBvcnQgeyBOZXh0QXBpUmVzcG9uc2UsIE5leHRBcGlSZXF1ZXN0IH0gZnJvbSBcIm5leHRcIjtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihcbiAgX3JlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlXG4pIHtcbiAgY29uc3QgaG9zdCA9IF9yZXEuaGVhZGVycy5ob3N0O1xuICAgIHZhciByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgVVJMX0FQSV9ERVYrJ3Jlc19jb21wYW55L2dldCcsXG4gICAgICB7XG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICd4LWZvcndhcmRlZC1mb3InOiBTdHJpbmcoaG9zdCksXG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIClcbiAgICB2YXIgY29tcGFueSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIC8vIGNvbnN0IGNvbXBhbnkgPSBhd2FpdCBnZXRDb21wYW55KCk7XG4gICAgXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgY29tcGFueVxuICAgICAgfSk7XG4gIFxufVxuIl0sIm5hbWVzIjpbIlVSTF9BUElfREVWIiwiaGFuZGxlciIsIl9yZXEiLCJyZXMiLCJob3N0IiwiaGVhZGVycyIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJTdHJpbmciLCJjb21wYW55IiwianNvbiIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/company/index.tsx\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/company/index.tsx"));
module.exports = __webpack_exports__;

})();