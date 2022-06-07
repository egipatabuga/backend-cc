const { Transactions } = require("../models")

const getData = async (req, res) => {
    try {
        const data = await Transactions.findAll({ 
            include: ["details"] ,
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

        const data = await Transactions.findOne({
            include: ["details"],
            where: { id, user_id },
        });

        if(!data){
            res.status(404).json({
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
        const{total, status} = req.body;
        let user_id = req.user_id;

        const data = new Transactions({
            user_id, total, status
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

module.exports = {
    getData,
    getDataDetail,
    createData
}