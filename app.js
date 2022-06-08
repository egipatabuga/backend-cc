const express = require("express");
const db = require("./config/db");
const app = express();
const Router = require("./routes");

app.use(express.urlencoded({ extended: true }));
db.authenticate().then(() =>{
    console.log("berhasil terkoneksi dengan database")}
);

app.use("/api", Router)
app.get("/", async (req, res) => {
    res.json({
        message: "haloo kalpataru"
    });
});

app.listen(process.env.PORT || 3000, () =>
    console.log(`Runing server on port ${process.env.PORT || 3000}`)
);