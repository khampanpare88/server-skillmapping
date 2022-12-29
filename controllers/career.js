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
    const token = req.params.token;
    const id  = req.params.id;
    // const student = req.params.student;

    try{
        // const test = await StudentModel.find({student_id : student});
        const student = await StudentModel.find({token:token});
        var career = await careersModel.find({_id : id});
        var skill_student =[];
        const n = student[0].skills.length;
        const m = career[0].skills.length;
        console.log(n);
        console.log(m);
        for(let i = 0; i < n ; i++){
            for(let j = 0; j < m ; j++){
                if(student[0].skills[i].skill_name === career[0].skills[j].skill_name ){
                    skill_student[j] = {
                        name : career[0].skills[j].skill_name,
                        level : student[0].skills[i].level_id
                    };
                    if(skill_student[j].level === undefined){
                        skill_student[j].level = 0;
                    } 
                }
            };
        };
        var obj = {
            career: career,
            skill_student: skill_student
        };

        console.log(obj);
        res.status(200).json(obj);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

