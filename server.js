const express = require("express");
const app = express();
const port = 3000;

app.get("/client", (req,res)=>{
    res.send("GHxsdf");
})

app.get("/", (req, res) => {
  res.send("testing from forked file.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
