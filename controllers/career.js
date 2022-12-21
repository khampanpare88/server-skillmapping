import careersModel from '../models/careermodel.js';

//show career
export const getCareers = async (req,res) =>{

    try{
        const career = await careersModel.find();
        res.status(200).json(career);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


export const getCareer = async (req,res) =>{
    const  id  = req.params.id;

    try{
        const career = await careersModel.findById({_id : id});
        res.status(200).json(career);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

