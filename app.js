const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/sitemap.xml", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "sitemap.xml"));
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});
