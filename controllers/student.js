import StudentModel from '../models/studentmodent.js';
import CoursesModel from '../models/coursesmodel.js';

//show datastudent
export const getStudent = async (req,res) =>{
    // const token = 12345;
    const  token_id  = req.params.token;
    try{
        // const student = await StudentModel.find({token : token});
        const student = await StudentModel.find({token : token_id});
        // console.log(courses[0].skills[0]);
        // console.log(student[0].skills[0].skill_name);
        res.status(200).json(student);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


//add like skill
export const addLikeskills = async (req,res) =>{
// sent array 
    const {token,skill} = req.body;
    // console.log();
    try{

        const find = await StudentModel.find({token :token});
        // console.log(find[0].skills.length);
        const n = find[0].skills.length;
        const m = skill.length;
        // console.log(n);
        // console.log(m);
        var courseskill = [];
        for(let x = 0; x < m; x++){
            courseskill.push(false);
        };
        for(let i = 0;i < n;i++){
            for(let j =0; j< m;j++){
                // console.log(skill[j]);
                if(find[0].skills[i].skill_name === skill[j].name){
                    courseskill[j] = true;
                    const dropLikeskills = { $pull: { skills : find[0].skills[i]}};
                    await StudentModel.findOneAndUpdate(token,dropLikeskills,{ new: true });

                    const addLikeskills = { $push: { skills : {_id : find[0].skills[i]._id, skill_name: find[0].skills[i].skill_name, level_id : find[0].skills[i].level_id,skill_like : skill[j].skill_like,skill_self :find[0].skills[i].skill_self}}};
                    await StudentModel.findOneAndUpdate(token,addLikeskills,{ new: true });
                };
            };
        };
        for(let y = 0; y < m; y++){
            if(courseskill[y] == false){
                const addlikeskill = { $push:{skills : {_id : skill[y]._id ,skill_name :skill[y].name ,level_id : skill[y].level_id,skill_like : skill[y].skill_like,skill_self:skill[y].skill_self }} }
                await StudentModel.findOneAndUpdate(token,addlikeskill,{ new: true });
            }
        }
        const final = await StudentModel.find({token :token});
        if(final[0].skills.length == 21){
            res.status(200).json(final);
        }
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

//add skill_self
export const addSelfkills = async (req,res) =>{
    // sent array 
        const {token,skill} = req.body;
        try{

        const find = await StudentModel.find({token :token});
        // console.log(find[0].skills.length);
        const n = find[0].skills.length;
        const m = skill.length;
        // console.log(n);
        // console.log(m);
        var courseskill = [];
        for(let x = 0; x < m; x++){
            courseskill.push(false);
        };
        for(let i = 0;i < n;i++){
            for(let j =0; j< m;j++){
                // console.log(skill[j]);
                if(find[0].skills[i].skill_name === skill[j].name){
                    courseskill[j] = true;
                    const dropLikeskills = { $pull: { skills : find[0].skills[i]}};
                    await StudentModel.findOneAndUpdate(token,dropLikeskills,{ new: true });

                    const addLikeskills = { $push: { skills : {_id : find[0].skills[i]._id, skill_name: find[0].skills[i].skill_name, level_id : find[0].skills[i].level_id,skill_like : find[0].skills[i].skill_like,skill_self :skill[j].skill_self}}};
                    await StudentModel.findOneAndUpdate(token,addLikeskills,{ new: true });
                };
            };
        };
        for(let y = 0; y < m; y++){
            if(courseskill[y] == false){
                const addlikeskill = { $push:{skills : {_id : skill[y]._id ,skill_name :skill[y].name ,level_id : skill[y].level_id,skill_like : skill[y].skill_like,skill_self:skill[y].skill_self }} }
                await StudentModel.findOneAndUpdate(token,addlikeskill,{ new: true });
            }
        }
        const final = await StudentModel.find({token :token});
        if(final[0].skills.length == 21){
            res.status(200).json(final);
        }
    } catch(error){
        res.status(404).json( {message: error.message });
    }
    };


//add course
export const addCourses = async (req,res) =>{
    const { id,token,course_name,course_id } = req.body;
    try{
        
        const check = await StudentModel.find({token:token,courses:{_id : id,course_name : course_name,course_id :course_id}});

        // console.log(check);
        if(check.length !== 0){
            
            const student = await StudentModel.find({token : token});
            // console.log("check");
            // console.log(student);
            res.status(200).json(student);
        }
        else if(check.length === 0){
            const addCourses = { $push: { courses : {_id : id,course_name : course_name,course_id : course_id} } };
            const studentaddcourses = await StudentModel.findOneAndUpdate(token,addCourses,{ new: true });
            // console.log("done");
            // console.log(student);
            const course = await CoursesModel.find({_id : id,course_name : course_name,course_id : course_id});
            const student = await StudentModel.find({token:token});
            const n = course[0].skills.length;
            const m = student[0].skills.length;

            const check = await StudentModel.find({token:token, skills : student[0].skills});
            // console.log(check);
            if(check.length !== 0){
                // console.log("!==");
                // const n = course[0].skills.length;
                // const m = student[0].skills.length;
                var courseskill = [];
                for(let x = 0; x < course[0].skills.length; x++){
                    courseskill.push(false);
                };
                // let i = 0;
                // let j = 0;
                for(let i = 0; i < m ;i++){
                    // console.log(" i = " ,i);
                    // console.log(m);
                    // console.log("i = ",student[0].skills[i]);

                    for(let j = 0; j < n;j++){
                        if(student[0].skills[i].skill_name === course[0].skills[j].skill_name){
                            courseskill[j] = true;
                            // console.log(student[0].skills[i].level_id);
                            // console.log("if ==="); 
                            // console.log(course[0].skills[j].skill_name);
                            if(student[0].skills[i].level_id === undefined){
                                
                                const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });

                                const addskilllevel = { $push:{skills :{_id : course[0].skills[j]._id ,skill_name :course[0].skills[j].skill_name,level_id : course[0].skills[j].level_id, skill_like : student[0].skills[i].skill_like,skill_self:student[0].skills[i].skill_self }} }
                                await StudentModel.findOneAndUpdate(token,addskilllevel,{ new: true });

                                // const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                // await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });
                                
                            }
                            else if(student[0].skills[i].level_id < course[0].skills[j].level_id){
                                
                                const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });

                                const addskilllevel = { $push:{skills :{_id : course[0].skills[j]._id ,skill_name :course[0].skills[j].skill_name,level_id : course[0].skills[j].level_id,skill_like : student[0].skills[i].skill_like,skill_self:student[0].skills[i].skill_self }} }
                                await StudentModel.findOneAndUpdate(token,addskilllevel,{ new: true });

                                // const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                // await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });
                                
                            };
                        };
                    };
                };
                for(let y = 0; y < course[0].skills.length; y++){
                    if(courseskill[y] == false){
                        const addskill = { $push:{skills : {_id : course[0].skills[y]._id ,skill_name :course[0].skills[y].skill_name ,level_id : course[0].skills[y].level_id}} }
                        await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
                    }
                }
            }
            else if(check.length === 0){
                // console.log("===");
                // const addskill = { $push:{skills :course[0].skills} }
                // await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
                for(let a = 0; a <n ;a++){
                    const addskill = { $push:{skills :{_id : course[0].skills[a]._id ,skill_name :course[0].skills[a].skill_name ,level_id : course[0].skills[a].level_id,skill_like : course[0].skills[a].skill_like,skill_self:course[0].skills[a].skill_self}} }
                    await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
                }
            };
            const done = await StudentModel.find({token : token,courses:{_id :id,course_name :course_name,course_id:course_id}});
            res.status(200).json(done);
        };
    }
    catch(error){
        res.status(404).json( {message: error.message });
    };
};

