const express = require("express");
const app = express();
const db = require("./config/db");
const Jenis = require("./models/user");
const fetch = require("node-fetch");
const FormData = require('form-data');

app.get("/", (req, res) => res.send("respons express berhasil"));

app.use(express.urlencoded({ extended: true }));


db.authenticate().then(() =>{
    console.log("berhasil terkoneksi dengan database")}
);

//menambahkan jenis dan harga
app.post("/types", async(req, res) => {
    try{
        const{jenis, harga} = req.query;

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

app.get("/price", async (req, res) => {
    try {
    const image = req.body.b64;
    
    const form = new FormData();
    form.append('b64', image);

    const response = await fetch('http://127.0.0.1:5000/api/predict/', {
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



app.listen(8001, () =>
    console.log(`Runing serever in port 8001`)
);