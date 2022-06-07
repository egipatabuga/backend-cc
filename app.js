const express = require("express");
const app = express();
const db = require("./config/db");
const {Jenis, History} = require("./models/user");
const fetch = require("node-fetch");
const FormData = require('form-data');

app.get("/", (req, res) => res.send("respons express berhasil"));

app.use(express.urlencoded({ extended: true }));


db.authenticate().then(() =>{
    console.log("berhasil terkoneksi dengan database")}
);

//menambahkan jenis dan harga
app.post("/addtypes", async(req, res) => {
    try{
        const{jenis, harga} = req.body;
        const newJenis = new Jenis({
            jenis, harga
        })
        await newJenis.save();

        res.json(newJenis);
    }catch (err){
        console.error(err.message);
        res.status(500).send("server error")
    }
});

//mendapatkan semua data
app.get("/types", async (req, res) => {
    try {
    const getAllJenis = await Jenis.findAll({});

    res.json(getAllJenis);
    } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
    }
});

//mendapatkan data berdasarkan jenis
app.get("/types/:jenis", async (req, res) => {
    try {
    const jenis = req.params.jenis;

    const getJenis = await Jenis.findOne({
        where: { jenis: jenis }
    });

    res.json(getJenis);
    } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
    }
});

//menghapus data berdasarkan jenis
app.delete("/types/:jenis", async (req, res) => {
    try {
    const jenis = req.params.jenis;

    const deleteJenis = await Jenis.destroy({
        where: { jenis: jenis }
    });
    await deleteJenis;

    res.json("berhasil di hapus");
    } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
    }
});

//update data
app.put("/types/:jenis", async (req, res) => {
    try {
    const {jenis, harga} = req.body;
    
    const updateJenis = await Jenis.update(
        {
        jenis,
        harga
        },
        { where: { jenis: jenis } }
    );
    await updateJenis;

    res.json("berhasil di update");
    } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
    }
});

//mengirim base64 ke ml untuk diklasifikasi dan dikembalikan ke backend cc hasilnya dan dicari ke database untuk mengetahui harga dan hasilnya dikembalikan ke md
app.post("/price", async (req, res) => {
    try {
    const image = req.body.b64;
    
    const form = new FormData();
    form.append('b64', image);

    const response = await fetch('https://api-services-model-ohbn7c3klq-et.a.run.app/api/predict/', {
        method: 'post',
        body: form,
    })
    const responseJson =await response.json();

    const jenis = responseJson.image.label;
    
    const getJenis = await Jenis.findOne({
        where: { jenis }
    });

    res.json(getJenis);
    } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
    }
});



//menambahkan history
app.post("/addhistory", async(req, res) => {
    try{
        const{username, payed, date, time} = req.body;
        const newHistory = new History({
            username, payed, date, time
        })
        await newHistory.save();

        res.json(newHistory);
    }catch (err){
        console.error(err.message);
        res.status(500).send("server error")
    }
});

app.get("/history", async (req, res) => {
    try {
    const getAllHistory = await History.findAll({});
    
    res.json(getAllHistory);
    } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
    }
});

app.listen(process.env.PORT, () =>
    console.log(`Runing server on port ${process.env.PORT}`)
);