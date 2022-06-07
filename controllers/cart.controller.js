const { Carts } = require("../models")

const getData = async (req, res) => {
    try {
        const data = await Carts.findAll({ 
            include: ["trash"] ,
            where: {
                user_id: req.user_id
            }
        });

        res.status(200).json({
            message: "Berhasil mengambil data",
            data: data
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const getDataDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user_id

        const data = await Carts.findOne({
            include: ["trash"],
            where: { id, user_id },
        });

        if(!data){
            return res.status(404).json({
                message: "Data not found!"
            })
        }
    
        res.status(200).json({
            message: "Berhasil mengambil data",
            data: data
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const createData = async (req, res) => {
    try{
        const { trashes_id, quantity, subtotal } = req.body;
        let user_id = req.user_id;

        const data = new Carts({
            user_id, trashes_id, quantity, subtotal
        })

        await data.save();

        res.status(200).json({
            message: "Berhasil menambahkan data",
            data
        });
    }catch (err){
        res.status(500).json({
            message: err.message
        })
    }
}

const updateData = async (req, res) => {
    try{
        const id = req.params.id;
        const{ trashes_id, quantity, subtotal } = req.body;
        let user_id = req.user_id;

        const getData = await Carts.findOne({where:{id}})

        if(!getData){
            return res.status(404).json({
                message: "Data not found!"
            })
        }

        const data = await Carts.update({
            trashes_id, quantity, subtotal
        },{ 
            where: { id: id } 
        });

        res.status(200).json({
            message: "Berhasil update data",
            data
        });
    }catch (err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    getData,
    getDataDetail,
    createData,
    updateData
}