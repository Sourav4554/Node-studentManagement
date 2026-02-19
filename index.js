const http = require("http");
const path = require("path");
const fs = require("fs");
const { addUser } = require("./addUser");

const PORT = 8080;

http
  .createServer((req, res) => {
    //section for get request
    if (req.method === "GET") {
      if (req.url === "/") {
        const htmlPath = path.join(__dirname, "Public", "index.html");
        fs.readFile(htmlPath, (err, data) => {
          if (err) {
            res.end(err);
            return;
          } else {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end(data);
          }
        });
      } else if (req.url === "/style.css") {
        const cssPath = path.join(__dirname, "Public", "style.css");
        fs.readFile(cssPath, (err, data) => {
          if (err) {
            res.end(err);
            return;
          } else {
            res.writeHead(200, { "Content-type": "text/css" });
            res.end(data);
          }
        });
      } else if (req.url === "/script.js") {
        const jsPath = path.join(__dirname, "Public", "script.js");
        fs.readFile(jsPath, (err, data) => {
          if (err) {
            res.end(err);
            return;
          } else {
            res.writeHead(200, { "Content-type": "application/javascript" });
            res.end(data);
          }
        });
      } else if(req.url==='/students'){
        const jsonFile=path.join(__dirname,'Public','user.json')
      fs.readFile(jsonFile,(err,data)=>{
      if(err){
      res.end(err)
      }else{
      res.writeHead(200,{'Content-type':'applicatin/json'})
      res.end(data)
      }
      })
      }
    
      //section for post request
    } else if (req.method === "POST" && req.url==='/submit') {
      console.log('working')
      let data = "";
      req.on("data", (chunk) => {
        data += chunk.toString();
      });
      req.on("end", async () => {
        const parsedData = JSON.parse(data);
    
        await addUser(parsedData);
    
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Student added" }));
      });
      //section for update request
    } else if (req.method === "PUT") {
    }
  })
  .listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
