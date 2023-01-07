import careersModel from '../models/careermodel.js';
import CoursesModel from '../models/coursesmodel.js';
import SkillsModel from '../models/skillmodel.js';
import StudentModel from '../models/studentmodent.js';

// course map skill
export const SkilltoCourse = async (req,res) =>{
    const {token} = req.param.token;
    const student = await StudentModel.find(token);
    const courses = await CoursesModel.find();

    const n = student[0].skills.length;
    const m = courses[0].skills.length;
    const w =[];
    const p =[];
    const q =[];


    // const  id  = req.params.id;
    // // const student = req.params.student;
    // const student = req.params.student;

    // try{

    //     res.status(200).json(career);
    // } catch(error){
    //     res.status(404).json( {message: error.message });
    // }
};

// career map skill
export const SkilltoCareer = async (req,res) =>{
    // const {token} = req.param;
    const token = 12345;

    const student = await StudentModel.find({token:token});
    const career = await careersModel.find();

    // const n = student[0].skills.length;
    // const m = career[0].skills.length;
    var w =[];
    let p =[];
    let q =[];
    try{
        for(let i = 0;i < student[0].skills.length ;i ++){
            // console.log(w[i]);
            // console.log(student[0].skills[i].level_id);
            // console.log(parseFloat(student[0].skills[19].level_id) + parseFloat(student[0].skills[20].level_id));
        };
        // for(let i=0; i<21 ;i++){
        //     console.log(w[i]);
        // };
        for(let j = 0; j < 21;j++){
            if(w[j] === undefined){
                w[j] = 0;
            };
        };

        res.status(200).json(student);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};