const http = require("http");
const fs = require("fs");
const path = require("path");

// 定义端口和 dist 目录
const port = 7777;

const distDir = path.join(__dirname);


// 创建服务器
const server = http.createServer((req, res) => {
  // 构造文件路径
  const filePath = path.join(distDir, req.url);
  console.log('filePath', filePath)
  // 获取文件扩展名
  const extname = String(path.extname(filePath)).toLowerCase();

  // 根据文件扩展名设置正确的 Content-Type
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".svg": "application/image/svg+xml",
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  // 读取文件
  fs.readFile(filePath, (error, content) => {
    // console.log("filePath", filePath, error);
    if (error) {
      if (error.code === "ENOENT") {
        // 文件未找到，返回 404
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>", "utf-8");
      } else {
        // 其他错误，返回 500
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // 成功读取文件，返回文件内容
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

// 监听端口
server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/swagger.json`);
});
