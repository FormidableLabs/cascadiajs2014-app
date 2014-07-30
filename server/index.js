var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  PORT = process.env.PORT || 3000;

// Static routes.
app.use("/", express["static"]("app"));
app.use("/app", express["static"]("app"));
app.use("/test", express["static"]("test"));

// REST backend.
app.get("/notes/:id", function (req, res) {
  res.json({
    id: req.params.id,
    title: "title # " + req.params.id,
    text: "text # " + req.params.id
  });
});

app.get("/notes", function (req, res) {
  res.json([
    {"id":1,"title":"title # 1","text":"text # 1"},
    {"id":2,"title":"title # 2","text":"text # 2"},
    {"id":3,"title":"title # 3","text":"text # 3"}
  ]);
});

// Other configuration and startup.
app.use(bodyParser());
app.listen(PORT);













