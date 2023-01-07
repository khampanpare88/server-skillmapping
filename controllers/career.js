import careersModel from '../models/careermodel.js';
import StudentModel from '../models/studentmodent.js';
import CoursesModel from '../models/coursesmodel.js';

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
        const course = await CoursesModel.find();
        var chart =[3];
        var skillname = [];
        var studentlevel = [];
        var careerlevel = [];
        const n = student[0].skills.length;
        const m = career[0].skills.length;
        // console.log(n);
        // console.log(m);
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

        var coursecheck = [];
        var coursetest = [];
        for(let i=0; i< CoursesModel.find(); i++){
            coursetest.push(false);
        };
        for(let i = 0; i < course.length ;i++){
            for(let j = 0; j < student[0].courses.length ;j++){
                if(course[i].name !== student[0].courses[j].course_name){
                    for(let m=0;m < course[i].skills.length ;m++){
                        for(let n =0;n < career[0].skills.length;n++){
                            if(course[i].skills[m].skill_name === career[0].skills[n].skill_name){
                                if(course[i].skills[m].level_id > career[0].skills[n].level_id){
                                    coursecheck[i] = {
                                        id : course[i].id,
                                        name :  course[i].name,
                                        sel_topic : course[i].sel_topic,
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        var courses = [];
        let x = 0;
        for(let i=0;i<coursecheck.length;i++){
            if(coursecheck[i] !== undefined){
                courses[x++] = coursecheck[i];
            };
        };

        
        chart[0] = skillname;
        chart[1] = studentlevel;
        chart[2] = careerlevel;
        var obj = {
            career,
            chart,
            courses
        };

        // console.log(obj);
        res.status(200).json(obj);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

