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
        const career = await careersModel.find({_id : id});
        var chart =[3];
        var skillname = [];
        var studentlevel = [];
        var careerlevel = [];
        const n = student[0].skills.length;
        const m = career[0].skills.length;
        console.log(n);
        console.log(m);
        for(let i = 0; i < n ; i++){
            for(let j = 0; j < m ; j++){
                if(student[0].skills[i].skill_name === career[0].skills[j].skill_name ){
                        skillname[j] = career[0].skills[j].skill_name;
                        studentlevel[j] = student[0].skills[i].level_id
                        careerlevel[j] = career[0].skills[j].level_id
                    if(studentlevel[j] === undefined){
                        studentlevel[j] = 0;
                    } 
                }
            };
        };
        chart[0] = skillname;
        chart[1] = studentlevel;
        chart[2] = careerlevel;
        var obj = {
            career,
            chart
        };

        console.log(obj);
        res.status(200).json(obj);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

