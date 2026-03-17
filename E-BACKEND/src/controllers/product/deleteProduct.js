import Product from "../../models/product.js";


const deleteProduct = async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product){
            return res.status(404).json({msg: 'product not found'});
        }

        res.status(200).json({msg:'Product deleted successsfulluy'})
    }
    catch(err){
        res.status(500).json({msg : err.message},()=>{console.log('delete product was crashed');
        })

    }
};

export default deleteProduct;

