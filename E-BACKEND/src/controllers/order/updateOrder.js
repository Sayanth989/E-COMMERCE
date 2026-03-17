import Order from "../../models/order.js";

const updateOrder = async (req,res)=>{
    try{
        const {status} = red.body;

        const validStatus =['pending','shipped','delivered','cancelled'];
        if(!validStatus.includes(status)){
            return res.status(400).json({msg:'Invalid status'})
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true}  // without this old data will retrun with this new 
        );

        if(!order){
            return res.status(404).json({msg:'Order not found'})
        }
        res.status(200).json({
            msg:'Order updated successfully',order
        });

    }
    catch(err){
        res.status(500).json({msg: err.message});
    }
};

export default updateOrder;