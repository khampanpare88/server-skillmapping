import careersModel from '../models/careermodel.js';
import CoursesModel from '../models/coursesmodel.js';
import SkillsModel from '../models/skillmodel.js';
import StudentModel from '../models/studentmodent.js';

// course map skill
export const SkillMapping = async (req,res) =>{
    const  token  = req.params.token;
    // const token = 620610777;
    const student =  await StudentModel.find({student_id : token });
    const skills = await SkillsModel.find();
    const career = await careersModel.find();

    var skillsstudent = [];
    var bycourses =[];
    var byself =[];
    var careers =[];
    
    var like = 0;
    var distance = 0;
    var distance1 = 0;

    var minus =0;
    var minus1 =0;
    

    try{
        for(let i=0;i<skills.length;i++){
            for(let j=0;j<student[0].skills.length;j++){
                if(skills[i].name === student[0].skills[j].skill_name){
                    // console.log(skills[i].name);
                    // console.log(student[0].skills[j].skill_name);
                    like = student[0].skills[j].skill_like/4;
                    skillsstudent[i] = {
                        skill_name : student[0].skills[j].skill_name,
                        level_id : student[0].skills[j].level_id,
                        skill_like : like,
                        skill_self : student[0].skills[j].skill_self
                    };
                };
            };
        };

        for(let j =0; j< career.length; j++){
            var skillscareers =[];
            for(let i=0;i<skills.length;i++){
                for(let k=0; k<career[j].skills.length;k++){
                    if(skills[i].name === career[j].skills[k].skill_name){
                        skillscareers[i] = {
                            skill_name : skills[i].name,
                            level_id : career[j].skills[k].level_id
                        };
                    };
                    // console.log(career[j].skills[k].skill_name);
                    if(skillscareers[i] == null || skillscareers[i] == undefined ){
                        skillscareers[i] = {
                            skill_name : skills[i].name,
                            level_id : 0
                        };
                    }
                };
            };
            careers[j] ={
                _id : career[j]._id,
                name_career : career[j].name_career,
                skillscareers
            };
        };


        for(let i=0;i<skillsstudent.length;i++){
            for(let j=0;j<careers.length;j++){
                for(let k=0;k<careers[j].skillscareers.length;k++){
                    if(careers[j].skillscareers[k].level_id !== 0){
                        minus = (careers[j].skillscareers[k].level_id - (skillsstudent[i].level_id * skillsstudent[i].skill_like)) ** 2;
                        minus += minus;
                        // console.log(minus);

                        minus1 = (careers[j].skillscareers[k].level_id - (skillsstudent[i].skill_self * skillsstudent[i].skill_like)) ** 2;
                        minus1 += minus1;
                    };
                    distance = minus ** 0.5;
                    distance1 = minus1 ** 0.5;

                    bycourses[j] = {
                        _id : careers[j]._id,
                        career : careers[j].name_career,
                        distance : distance.toFixed(2)
                    };

                    byself[j] = {
                        _id : careers[j]._id,
                        career : careers[j].name_career,
                        distance : distance1.toFixed(2)
                    };
                };
            };

        };


        function compare( a, b ) {
            if ( a.distance < b.distance ){
              return -1;
            }
            if ( a.distance > b.distance ){
              return 1;
            }
            return 0;
        }

        bycourses = bycourses.sort( compare );
        byself =byself.sort( compare );
        
        bycourses = [
            bycourses[0],
            bycourses[1],
            bycourses[2],
            bycourses[3],
            bycourses[4]
        ];

        byself =[
            byself[0],
            byself[1],
            byself[2],
            byself[3],
            byself[4]
        ];

        var Obj = {
            bycourses,
            byself
        };

        res.status(200).json(Obj);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};
