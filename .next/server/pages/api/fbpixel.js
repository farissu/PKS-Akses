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
exports.id = "pages/api/fbpixel";
exports.ids = ["pages/api/fbpixel"];
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

/***/ "(api)/./src/pages/api/fbpixel/index.tsx":
/*!*****************************************!*\
  !*** ./src/pages/api/fbpixel/index.tsx ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var _erp_Helpers_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/erp/Helpers/config */ \"(api)/./src/erp/Helpers/config.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nasync function handler(req, res) {\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(_erp_Helpers_config__WEBPACK_IMPORTED_MODULE_1__.URL_API_DEV + \"fbpixel\", {\n        headers: {\n            \"X-Forwarded-for\": String(req.headers.host)\n        }\n    });\n    if (response.data.length > 0) {\n        res.status(response.status).json(response.data[0].id_pixel);\n    } else {\n        res.status(response.status).json(response.data);\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2ZicGl4ZWwvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUUwQjtBQUN5QjtBQUNwQyxlQUFlRSxRQUFRQyxHQUFtQixFQUFFQyxHQUFvQixFQUFFO0lBRTdFLE1BQU1DLFdBQVcsTUFBTUwsaURBQVMsQ0FBQ0MsNERBQVdBLEdBQUcsV0FBVztRQUN0RE0sU0FBUztZQUNMLG1CQUFtQkMsT0FBT0wsSUFBSUksT0FBTyxDQUFDRSxJQUFJO1FBQzlDO0lBQ0o7SUFFQSxJQUFJSixTQUFTSyxJQUFJLENBQUNDLE1BQU0sR0FBRyxHQUFHO1FBQzFCUCxJQUFJUSxNQUFNLENBQUNQLFNBQVNPLE1BQU0sRUFBRUMsSUFBSSxDQUFDUixTQUFTSyxJQUFJLENBQUMsRUFBRSxDQUFDSSxRQUFRO0lBQzlELE9BQU87UUFDSFYsSUFBSVEsTUFBTSxDQUFDUCxTQUFTTyxNQUFNLEVBQUVDLElBQUksQ0FBQ1IsU0FBU0ssSUFBSTtJQUNsRCxDQUFDO0FBRUwsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NmX2V4dC8uL3NyYy9wYWdlcy9hcGkvZmJwaXhlbC9pbmRleC50c3g/ZTkwYyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IFVSTF9BUElfREVWIH0gZnJvbSAnQC9lcnAvSGVscGVycy9jb25maWcnO1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkge1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoVVJMX0FQSV9ERVYgKyAnZmJwaXhlbCcsIHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJYLUZvcndhcmRlZC1mb3JcIjogU3RyaW5nKHJlcS5oZWFkZXJzLmhvc3QpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHJlc3BvbnNlLmRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICByZXMuc3RhdHVzKHJlc3BvbnNlLnN0YXR1cykuanNvbihyZXNwb25zZS5kYXRhWzBdLmlkX3BpeGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXMuc3RhdHVzKHJlc3BvbnNlLnN0YXR1cykuanNvbihyZXNwb25zZS5kYXRhKVxuICAgIH1cblxufVxuIl0sIm5hbWVzIjpbImF4aW9zIiwiVVJMX0FQSV9ERVYiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwicmVzcG9uc2UiLCJnZXQiLCJoZWFkZXJzIiwiU3RyaW5nIiwiaG9zdCIsImRhdGEiLCJsZW5ndGgiLCJzdGF0dXMiLCJqc29uIiwiaWRfcGl4ZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/fbpixel/index.tsx\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/fbpixel/index.tsx"));
module.exports = __webpack_exports__;

})();