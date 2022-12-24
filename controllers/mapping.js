import careersModel from '../models/careermodel.js';
import CoursesModel from '../models/coursesmodel.js';
import SkillsModel from '../models/skillmodel.js';
import StudentModel from '../models/studentmodent.js';

// course map skill
export const SkilltoCourse = async (req,res) =>{
    // const  id  = req.params.id;
    // // const student = req.params.student;
    // const student = req.params.student;

    // try{
    //     // const test = await StudentModel.find({student_id : student});
    //     const career = await careersModel.findById({_id : id});
    //     res.status(200).json(career);
    // } catch(error){
    //     res.status(404).json( {message: error.message });
    // }
};

// career map skill
export const SkilltoCareer = async (req,res) =>{
    // const  id  = req.params.id;
    // // const student = req.params.student;
    // const student = req.params.student;

    // try{
    //     // const test = await StudentModel.find({student_id : student});
    //     const career = await careersModel.findById({_id : id});
    //     res.status(200).json(career);
    // } catch(error){
    //     res.status(404).json( {message: error.message });
    // }
};