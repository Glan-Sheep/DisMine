import http from "http";
http
  .createServer(function (req, res) {
    res.write("keep alive");
    res.end();
  })
  .listen(8080);