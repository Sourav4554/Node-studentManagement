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
      }

      //section for post request
    } else if (req.method === "POST" && req.url.startsWith('/submit')) {
       console.log('submitted')
       let data=''
       req.on('data',(chunk)=>{
        data+=chunk.toString()
        const searchparams=new URLSearchParams(data)
        addUser({
            name:searchparams.get('name'),
            age:Number(searchparams.get('age')),
            address:searchparams.get('address')
        })
       })

      //section for update request
    } else if (req.method === "PUT") {

    }
  })
  .listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
