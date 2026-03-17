import Product from "../../models/product.js";

const updateProduct = async (req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id ,//which pro
            req.body, //what to update
            {new:true} //return to update version
        );

        if(!product){
            return res.status(404).json({msg:'product not found'})
        }
        res.status(200).json({msg: 'product updated successfully',product});

    } catch(err){
        res.status(500).json({msg: 'err.message'},()=>{console.log('undateproct got crashed')})
    }
};
export default updateProduct;