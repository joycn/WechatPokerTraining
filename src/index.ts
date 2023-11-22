import path from "path";
import axios, {AxiosRequestConfig} from 'axios';

// import http, { IncomingMessage } from 'http';
import {IncomingMessage} from 'http';
import https from 'https';

import express, {Request, Response} from "express";
import cors from "cors";
import morgan from "morgan";
import * as process from "process";

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 小程序调用，获取微信 Open ID
// app.get("/api/wx_openid", async (req: Request, res: Response) => {
//     if (req.headers["x-wx-source"]) {
//         res.send(req.headers["x-wx-openid"]);
//     }
// });


let userList = ["ofGmF6owu-4AGPEuqR2b2ie83YZU", "ofGmF6v6A07iC-h-lSI9llLvhLzY"]

if (process.env.USER_LIST) {
    const additionalUserList = JSON.parse(process.env.USER_LIST)
    for (const addtionalUser of additionalUserList) {
        userList.push(addtionalUser)
    }
}

app.post("/api/echo", async (req: Request, res: Response) => {
    console.log(req.body)
    if (!req.body?.hasOwnProperty('Content')) {
        res.send("success")
    }


    let replyContent = {
        "MsgType": "text",
        "Content": "",
        "CreateTime": Date.now(),
        "FromUserName": req.body.ToUserName,
        "ToUserName": req.body.FromUserName
    }

    if (!userList.includes(req.body.FromUserName)) {
        replyContent.Content = '假装听不懂你在说什么...'
        res.send(JSON.stringify(replyContent))
        return
    }


    let content = {
        model: process.env.AI_MODEL || "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "请你用简单易懂的语言回答6岁小朋友的以下问题"
            }
        ],
    }

    let userMessage = {
        role: "user",
        content: req.body.Content
    }

    content.messages.push(userMessage)


    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.AI_TOKEN,
    }
    const apiHost = process.env.API_HOST || 'api.aiproxy.io';
    const url = `https://${apiHost}/v1/chat/completions`;
    console.log(url)
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: url,
        data: content,
        headers: headers
    };

    const response = await axios(config);
    console.log(response.data)
    console.log(response.data.choices[0].message)
    replyContent.Content = response.data.choices[0].message.content
    res.send(JSON.stringify(replyContent))

    console.log(content)
    // res.send('success');
    // res.send(JSON.stringify(replyContent))
});

const port = process.env.PORT || 80;

console.log("model: ", process.env.AI_MODEL)

async function bootstrap() {
    app.listen(port, () => {
        console.log("启动成功", port);
    });
}

bootstrap();