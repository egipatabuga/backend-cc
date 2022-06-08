const { Transactions, TransactionDetails, Carts, Trashes } = require("../models")
const transactionEnums = require("../config/transactionEnums")

const getData = async (req, res) => {
    try {
        const data = await Transactions.findAll({ 
            include: [{
                model: TransactionDetails,
                as: "details",
                include: [{
                    model: Trashes,
                    as: "trash"
                }]
            }] ,
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
            include: [{
                model: TransactionDetails,
                as: "details",
                include: [{
                    model: Trashes,
                    as: "trash"
                }]
            }],
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
        let user_id = req.user_id;
        const carts = await Carts.findAll({where: {user_id}, include: ["trash"]})
        let total = await getCartsSubtotal(carts)
        let status = transactionEnums.WAITING

        if(carts.length == 0){
            return res.status(400).json({
                message: "Keranjang anda masih kosong!"
            })
        }

        //store transaction table
        const data = await Transactions.create({
            user_id, total, status
        })

        //store transaction detail table
        carts.forEach(cart => {
            TransactionDetails.create({
                transaction_id: data.id,
                trashes_id: cart.trashes_id,
                quantity: cart.quantity,
                subtotal: cart.subtotal
            })
        })

        //Clear Cart
        await Carts.destroy({
            where: { user_id }
        });

        res.status(200).json({
            message: "Berhasil melakukan order",
            data
        });
    }catch (err){
        res.status(500).json({
            message: err.message
        })
    }
}

const getCartsSubtotal = async (carts) => {
    let total = 0;
    await carts.forEach(cart => {
        total += cart.trash.price
    });

    return total
}

module.exports = {
    getData,
    getDataDetail,
    createData
}