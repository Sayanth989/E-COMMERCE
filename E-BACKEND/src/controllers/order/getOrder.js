import Order from "../../models/order.js"

const getOrder = async(req,res)=>{
    try{
        const orders = await Order.find({user:req.user.id})
        .populate('items.product', 'name price image')
        .sort({createdAt:-1}) // sort it by using the (timesramps) .newest first
    }
    catch(err){
        res.status(500).json({msg: err.message},()=>{console.log('get order got crashed');
        })
    }
};
export default getOrder;