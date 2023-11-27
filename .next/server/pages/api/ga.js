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
exports.id = "pages/api/ga";
exports.ids = ["pages/api/ga"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./src/erp/Helpers/config.js":
/*!***********************************!*\
  !*** ./src/erp/Helpers/config.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CREATE_OTP_API_KEY\": () => (/* binding */ CREATE_OTP_API_KEY),\n/* harmony export */   \"CREATE_OTP_URL\": () => (/* binding */ CREATE_OTP_URL),\n/* harmony export */   \"MAIL_FROM\": () => (/* binding */ MAIL_FROM),\n/* harmony export */   \"MAIL_HOST\": () => (/* binding */ MAIL_HOST),\n/* harmony export */   \"MAIL_PASSWORD\": () => (/* binding */ MAIL_PASSWORD),\n/* harmony export */   \"MAIL_PORT\": () => (/* binding */ MAIL_PORT),\n/* harmony export */   \"MAIL_USERNAME\": () => (/* binding */ MAIL_USERNAME),\n/* harmony export */   \"URL_API_\": () => (/* binding */ URL_API_),\n/* harmony export */   \"URL_API_DEV\": () => (/* binding */ URL_API_DEV)\n/* harmony export */ });\n// Email\nconst MAIL_HOST = process.env.VITE_MAIL_HOST;\nconst MAIL_USERNAME = process.env.VITE_MAIL_USERNAME;\nconst MAIL_PASSWORD = process.env.VITE_MAIL_PASSWORD;\nconst MAIL_PORT = process.env.VITE_MAIL_PORT;\nconst MAIL_FROM = process.env.VITE_MAIL_FROM;\nconst CREATE_OTP_URL = process.env.VITE_CREATE_OTP_URL;\nconst CREATE_OTP_API_KEY = process.env.VITE_CREATE_OTP_API_KEY;\nconst URL_API_DEV = \"https://cf3-cnt-be-dev3.cnt.id/crowdfunding/\";\nconst URL_API_ = \"https://cf2-cnt-be-dev1.cnt.id/cf2/\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvZXJwL0hlbHBlcnMvY29uZmlnLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLFFBQVE7QUFDRCxNQUFNQSxZQUFZQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7QUFDNUMsTUFBTUMsZ0JBQWdCSCxRQUFRQyxHQUFHLENBQUNHLGtCQUFrQjtBQUNwRCxNQUFNQyxnQkFBZ0JMLFFBQVFDLEdBQUcsQ0FBQ0ssa0JBQWtCO0FBQ3BELE1BQU1DLFlBQVlQLFFBQVFDLEdBQUcsQ0FBQ08sY0FBYztBQUM1QyxNQUFNQyxZQUFZVCxRQUFRQyxHQUFHLENBQUNTLGNBQWM7QUFFNUMsTUFBTUMsaUJBQWlCWCxRQUFRQyxHQUFHLENBQUNXLG1CQUFtQixDQUFDO0FBQ3ZELE1BQU1DLHFCQUFxQmIsUUFBUUMsR0FBRyxDQUFDYSx1QkFBdUIsQ0FBQztBQUUvRCxNQUFNQyxjQUFjLCtDQUErQztBQUNuRSxNQUFNQyxXQUFXLHNDQUFzQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NmX2V4dC8uL3NyYy9lcnAvSGVscGVycy9jb25maWcuanM/MDQzZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFbWFpbFxuZXhwb3J0IGNvbnN0IE1BSUxfSE9TVCA9IHByb2Nlc3MuZW52LlZJVEVfTUFJTF9IT1NUXG5leHBvcnQgY29uc3QgTUFJTF9VU0VSTkFNRSA9IHByb2Nlc3MuZW52LlZJVEVfTUFJTF9VU0VSTkFNRVxuZXhwb3J0IGNvbnN0IE1BSUxfUEFTU1dPUkQgPSBwcm9jZXNzLmVudi5WSVRFX01BSUxfUEFTU1dPUkRcbmV4cG9ydCBjb25zdCBNQUlMX1BPUlQgPSBwcm9jZXNzLmVudi5WSVRFX01BSUxfUE9SVFxuZXhwb3J0IGNvbnN0IE1BSUxfRlJPTSA9IHByb2Nlc3MuZW52LlZJVEVfTUFJTF9GUk9NXG5cbmV4cG9ydCBjb25zdCBDUkVBVEVfT1RQX1VSTCA9IHByb2Nlc3MuZW52LlZJVEVfQ1JFQVRFX09UUF9VUkw7XG5leHBvcnQgY29uc3QgQ1JFQVRFX09UUF9BUElfS0VZID0gcHJvY2Vzcy5lbnYuVklURV9DUkVBVEVfT1RQX0FQSV9LRVk7XG5cbmV4cG9ydCBjb25zdCBVUkxfQVBJX0RFViA9IFwiaHR0cHM6Ly9jZjMtY250LWJlLWRldjMuY250LmlkL2Nyb3dkZnVuZGluZy9cIjtcbmV4cG9ydCBjb25zdCBVUkxfQVBJXyA9IFwiaHR0cHM6Ly9jZjItY250LWJlLWRldjEuY250LmlkL2NmMi9cIjsiXSwibmFtZXMiOlsiTUFJTF9IT1NUIiwicHJvY2VzcyIsImVudiIsIlZJVEVfTUFJTF9IT1NUIiwiTUFJTF9VU0VSTkFNRSIsIlZJVEVfTUFJTF9VU0VSTkFNRSIsIk1BSUxfUEFTU1dPUkQiLCJWSVRFX01BSUxfUEFTU1dPUkQiLCJNQUlMX1BPUlQiLCJWSVRFX01BSUxfUE9SVCIsIk1BSUxfRlJPTSIsIlZJVEVfTUFJTF9GUk9NIiwiQ1JFQVRFX09UUF9VUkwiLCJWSVRFX0NSRUFURV9PVFBfVVJMIiwiQ1JFQVRFX09UUF9BUElfS0VZIiwiVklURV9DUkVBVEVfT1RQX0FQSV9LRVkiLCJVUkxfQVBJX0RFViIsIlVSTF9BUElfIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/erp/Helpers/config.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/ga/index.tsx":
/*!************************************!*\
  !*** ./src/pages/api/ga/index.tsx ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var _erp_Helpers_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erp/Helpers/config */ \"(api)/./src/erp/Helpers/config.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nasync function handler(req, res) {\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(_erp_Helpers_config__WEBPACK_IMPORTED_MODULE_1__.URL_API_DEV + \"gaAnalythic\", {\n        headers: {\n            \"X-Forwarded-for\": String(req.headers.host)\n        }\n    });\n    if (response.data.length > 0) {\n        res.status(response.status).json(response.data[0].id_gwa);\n    } else {\n        res.status(response.status).json(response.data);\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2dhL2luZGV4LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFMEI7QUFDeUI7QUFDcEMsZUFBZUUsUUFBUUMsR0FBbUIsRUFBRUMsR0FBb0IsRUFBRTtJQUM3RSxNQUFNQyxXQUFXLE1BQU1MLGlEQUFTLENBQUNDLDREQUFXQSxHQUFHLGVBQWU7UUFDMURNLFNBQVM7WUFDTCxtQkFBbUJDLE9BQU9MLElBQUlJLE9BQU8sQ0FBQ0UsSUFBSTtRQUM5QztJQUNKO0lBQ0EsSUFBSUosU0FBU0ssSUFBSSxDQUFDQyxNQUFNLEdBQUcsR0FBRztRQUMxQlAsSUFBSVEsTUFBTSxDQUFDUCxTQUFTTyxNQUFNLEVBQUVDLElBQUksQ0FBQ1IsU0FBU0ssSUFBSSxDQUFDLEVBQUUsQ0FBQ0ksTUFBTTtJQUM1RCxPQUFPO1FBQ0hWLElBQUlRLE1BQU0sQ0FBQ1AsU0FBU08sTUFBTSxFQUFFQyxJQUFJLENBQUNSLFNBQVNLLElBQUk7SUFDbEQsQ0FBQztBQUdMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZl9leHQvLi9zcmMvcGFnZXMvYXBpL2dhL2luZGV4LnRzeD9mMzlkIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHR5cGUgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgVVJMX0FQSV9ERVYgfSBmcm9tICdAL2VycC9IZWxwZXJzL2NvbmZpZyc7XG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoVVJMX0FQSV9ERVYgKyAnZ2FBbmFseXRoaWMnLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiWC1Gb3J3YXJkZWQtZm9yXCI6IFN0cmluZyhyZXEuaGVhZGVycy5ob3N0KVxuICAgICAgICB9XG4gICAgfSlcbiAgICBpZiAocmVzcG9uc2UuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlcy5zdGF0dXMocmVzcG9uc2Uuc3RhdHVzKS5qc29uKHJlc3BvbnNlLmRhdGFbMF0uaWRfZ3dhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXMuc3RhdHVzKHJlc3BvbnNlLnN0YXR1cykuanNvbihyZXNwb25zZS5kYXRhKTtcbiAgICB9XG5cblxufVxuIl0sIm5hbWVzIjpbImF4aW9zIiwiVVJMX0FQSV9ERVYiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwicmVzcG9uc2UiLCJnZXQiLCJoZWFkZXJzIiwiU3RyaW5nIiwiaG9zdCIsImRhdGEiLCJsZW5ndGgiLCJzdGF0dXMiLCJqc29uIiwiaWRfZ3dhIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/ga/index.tsx\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/ga/index.tsx"));
module.exports = __webpack_exports__;

})();