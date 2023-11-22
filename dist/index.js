"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var axios_1 = __importDefault(require("axios"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var process = __importStar(require("process"));
var logger = (0, morgan_1.default)("tiny");
var app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(logger);
// 首页
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.sendFile(path_1.default.join(__dirname, "index.html"));
        return [2 /*return*/];
    });
}); });
// 小程序调用，获取微信 Open ID
// app.get("/api/wx_openid", async (req: Request, res: Response) => {
//     if (req.headers["x-wx-source"]) {
//         res.send(req.headers["x-wx-openid"]);
//     }
// });
var userList = ["ofGmF6owu-4AGPEuqR2b2ie83YZU", "ofGmF6v6A07iC-h-lSI9llLvhLzY"];
if (process.env.USER_LIST) {
    var additionalUserList = JSON.parse(process.env.USER_LIST);
    for (var _i = 0, additionalUserList_1 = additionalUserList; _i < additionalUserList_1.length; _i++) {
        var addtionalUser = additionalUserList_1[_i];
        userList.push(addtionalUser);
    }
}
app.post("/api/echo", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var replyContent, content, userMessage, headers, apiHost, url, config, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(req.body);
                if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.hasOwnProperty('Content'))) {
                    res.send("success");
                }
                replyContent = {
                    "MsgType": "text",
                    "Content": "",
                    "CreateTime": Date.now(),
                    "FromUserName": req.body.ToUserName,
                    "ToUserName": req.body.FromUserName
                };
                if (!userList.includes(req.body.FromUserName)) {
                    replyContent.Content = '假装听不懂你在说什么...';
                    res.send(JSON.stringify(replyContent));
                    return [2 /*return*/];
                }
                content = {
                    model: process.env.AI_MODEL || "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "请你用简单易懂的语言回答6岁小朋友的以下问题"
                        }
                    ],
                };
                userMessage = {
                    role: "user",
                    content: req.body.Content
                };
                content.messages.push(userMessage);
                headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + process.env.AI_TOKEN,
                };
                apiHost = process.env.API_HOST || 'api.aiproxy.io';
                url = "https://".concat(apiHost, "/v1/chat/completions");
                console.log(url);
                config = {
                    method: 'POST',
                    url: url,
                    data: content,
                    headers: headers
                };
                return [4 /*yield*/, (0, axios_1.default)(config)];
            case 1:
                response = _b.sent();
                console.log(response.data);
                console.log(response.data.choices[0].message);
                replyContent.Content = response.data.choices[0].message.content;
                res.send(JSON.stringify(replyContent));
                console.log(content);
                return [2 /*return*/];
        }
    });
}); });
var port = process.env.PORT || 80;
console.log("model: ", process.env.AI_MODEL);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            app.listen(port, function () {
                console.log("启动成功", port);
            });
            return [2 /*return*/];
        });
    });
}
bootstrap();
//# sourceMappingURL=index.js.map