import careersModel from '../models/careermodel.js';
import StudentModel from '../models/studentmodent.js';

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
    // const student = req.params.student;

    try{
        // const test = await StudentModel.find({student_id : student});
        const career = await careersModel.findById({_id : id});
        res.status(200).json(career);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

