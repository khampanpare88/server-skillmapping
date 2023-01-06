import StudentModel from '../models/studentmodent.js';
import CoursesModel from '../models/coursesmodel.js';

// delete course
export const deleteCourse = async (req,res) =>{
    const { token,course_name,course_id } = req.body;
    try{
        const studentbefor = await StudentModel.find({token:token});
        // console.log(studentbefor[0].courses.length);
        const deletecourse = { $pull: { courses : {course_name : course_name,course_id : course_id} } };
        const student = await StudentModel.findOneAndUpdate(token,deletecourse,{ new: true });
        const studentafter = await StudentModel.find({token:token});
        // console.log(studentafter[0].courses.length);
        
        if(studentafter[0].courses.length === 0){
            // console.log("if");
            // console.log(studentafter[0].skills.length);
            for(let a = 0; a < studentafter[0].skills.length; a++){
                // console.log("a = ",studentafter[0].skills.length);
                const editskilllevel = { $pull:{skills : studentafter[0].skills[a] } }
                await StudentModel.findOneAndUpdate(token,editskilllevel,{ new: true });
                const addskilllike = { $push:{skills :{_id : studentafter[0].skills[a]._id ,skill_name :studentafter[0].skills[a].skill_name,
                                        skill_like : studentafter[0].skills[a].skill_like,
                                        skill_self:studentafter[0].skills[a].skill_self }} }
                await StudentModel.findOneAndUpdate(token,addskilllike,{ new: true });
                                
            };
            res.status(200).json(student);
        }
        else {
            // console.log(studentafter[0].courses.length);
            const course = await CoursesModel.find();
            // console.log(n);
            var skill = [];
            for(let x = 0; x < studentafter[0].courses.length; x++){
                skill.push(false);
            };
            //dropskillของวิชานั้นๆออก
            for(let i=0;i<studentafter[0].courses.length;i++){
                for(let j =0;j<course.length;j++){
                    if(course[j].name === course_name){
                        for(let m=0;m < studentafter[0].skills.length;m++){
                            for(let n=0;n<course[j].skills.length;n++){
                                if(course[j].skills[n].skill_name === studentafter[0].skills[m].skill_name){
                                    if(studentafter[0].skills[m].skill_like === undefined || studentafter[0].skills[m].skill_self ===undefined){
                                        const deleteskilllevel = { $pull:{skills : studentafter[0].skills[m] } }
                                        await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });
                                    }
                                    else if(studentafter[0].skills[m].skill_like === undefined || studentafter[0].skills[m].skill_self ===undefined){
                                        const deleteskilllevel = { $pull:{skills : studentafter[0].skills[m] } }
                                        await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });

                                        const addskilllevel = { $push:{skills :{_id : course[j].skills[n]._id ,skill_name :course[j].skills[n].skill_name,
                                                                skill_like : studentafter[0].skills[m].skill_like,
                                                                skill_self:studentafter[0].skills[m].skill_self }} }
                                        await StudentModel.findOneAndUpdate(token,addskilllevel,{ new: true });
                                                                        
                                    };
                                };
                            };
                        };
                    };
                };
            };



            for(let i=0;i<studentafter[0].courses.length;i++){
                for(let j =0;j<course.length;j++){
                    if(studentafter[0].courses[i].course_name === course[j].name){
                        // console.log(studentafter[0].courses[i].course_name);
                        for(let m=0;m < studentafter[0].skills.length;m++){
                            for(let n=0;n<course[j].skills.length;n++){
                                if(studentafter[0].skills[m].skill_name === course[j].skills[n].skill_name){
                                    if(studentafter[0].skills[m].level_id < course[j].skills[n].level_id){
                                        const deleteskilllevel = { $pull:{skills : studentafter[0].skills[m] } }
                                        await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });

                                        const addskilllevel = { $push:{skills :{_id : course[j].skills[n]._id ,skill_name :course[j].skills[n].skill_name,
                                                                level_id : course[j].skills[n].level_id, skill_like : studentafter[0].skills[m].skill_like,
                                                                skill_self:studentafter[0].skills[m].skill_self }} }
                                        await StudentModel.findOneAndUpdate(token,addskilllevel,{ new: true });
                                    }
                                    else{
                                        const deleteskilllevel = { $pull:{skills : studentafter[0].skills[m] } }
                                        await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });

                                        const addskilllevel = { $push:{skills :{_id : course[j].skills[n]._id ,skill_name :course[j].skills[n].skill_name,
                                                                level_id : studentafter[0].skills[m].level_id, skill_like : studentafter[0].skills[m].skill_like,
                                                                skill_self:studentafter[0].skills[m].skill_self }} }
                                        await StudentModel.findOneAndUpdate(token,addskilllevel,{ new: true });
                                    }
                                            
                                };
                            };
                        };
                    };
                };
            };
        res.status(200).json(student);
        }
        
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};
