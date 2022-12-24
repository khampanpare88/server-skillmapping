import StudentModel from '../models/studentmodent.js';
import CoursesModel from '../models/coursesmodel.js';

// //show datastudent
// export const getStudent = async (req,res) =>{
//     // const token = 12345;
//     const {token} = req.body;
//     try{
//         // const student = await StudentModel.find({token : token});
//         const student = await StudentModel.find(token);
//         res.status(200).json(student);
//     } catch(error){
//         res.status(404).json( {message: error.message });
//     }
// };
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
    // const token = "12345";
    // const skill_name = "Coding";
    // const skill_like = "4";
    // const id = "6384744a07c740173a3d430c";

    // const { token,course_name,id,skill_like } = req.body;
    try{

        const find = await StudentModel.find({token :token});
        // console.log(find[0].skills.length);
        const n = find[0].skills.length;
        const m = skill.length;
        var courseskill = [];
        for(let x = 0; x < m; x++){
            courseskill.push(false);
        };
        for(let i = 0;i < n;i++){
            for(let j =0; j< m;j++){
                if(find[0].skills[i].skill_name === skill[j].skill_name){
                    courseskill[j] = true;
                    const dropLikeskills = { $pull: { skills : find[0].skills[i]}};
                    await StudentModel.findOneAndUpdate(token,dropLikeskills,{ new: true });

                    const addLikeskills = { $push: { skills : {_id : find[0].skills[i]._id, skill_name: find[0].skills[i].skill_name, level_id : find[0].skills[i].level_id,skill_like : skill[j].skill_like,skill_self :"0"}}};
                    await StudentModel.findOneAndUpdate(token,addLikeskills,{ new: true });
                };
            };
        };
        for(let y = 0; y < m; y++){
            if(courseskill[m] == false){
                const addlikeskill = { $push:{skills : {_id : skill[y]._id ,skill_name :skill[y].skill_name ,level_id : "0",skill_like : skill[y].skill_like,skill_self:"0" }} }
                await StudentModel.findOneAndUpdate(token,addlikeskill,{ new: true });
            }
        }
        // const addLikeskills = { $push: { skills : find[0].skills[].skill_like}};
        
        // const student = await StudentModel.findOneAndUpdate(token,addLikeskills,{ new: true });
        
        // console.log(student);
        const final = await StudentModel.find({token :token});
        res.status(200).json(final);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};

//add skill_self
export const addSelfkills = async (req,res) =>{
    // sent array 
        const {token,skill} = req.body;
        // const token = "12345";
        // const skill_name = "Coding";
        // const skill_like = "4";
        // const id = "6384744a07c740173a3d430c";
    
        // const { token,course_name,id,skill_like } = req.body;
        try{

        const find = await StudentModel.find({token :token});
        // console.log(find[0].skills.length);
        const n = find[0].skills.length;
        const m = skill.length;
        var courseskill = [];
        for(let x = 0; x < m; x++){
            courseskill.push(false);
        };
        for(let i = 0;i < n;i++){
            for(let j =0; j< m;j++){
                if(find[0].skills[i].skill_name === skill[j].skill_name){
                    courseskill[j] = true;
                    const dropLikeskills = { $pull: { skills : find[0].skills[i]}};
                    await StudentModel.findOneAndUpdate(token,dropLikeskills,{ new: true });

                    const addLikeskills = { $push: { skills : {_id : find[0].skills[i]._id, skill_name: find[0].skills[i].skill_name, level_id : find[0].skills[i].level_id,skill_like : skill[j].skill_like,skill_self :skill[j].skill_self}}};
                    await StudentModel.findOneAndUpdate(token,addLikeskills,{ new: true });
                };
            };
        };
        for(let y = 0; y < m; y++){
            if(courseskill[m] == false){
                const addlikeskill = { $push:{skills : {_id : skill[y]._id ,skill_name :skill[y].skill_name ,level_id : "0",skill_like : skill[y].skill_like,skill_self:skill[y].skill_self }} }
                await StudentModel.findOneAndUpdate(token,addlikeskill,{ new: true });
            }
        }
        // const addLikeskills = { $push: { skills : find[0].skills[].skill_like}};
        
        // const student = await StudentModel.findOneAndUpdate(token,addLikeskills,{ new: true });
        
        // console.log(student);
        const final = await StudentModel.find({token :token});
        res.status(200).json(final);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
    };


//add course
export const addCourses = async (req,res) =>{
    const { id,token,course_name,course_id } = req.body;

    // const token = "12345";

    // const id = "63330116d039104ac57efe11";
    // const course_name = "Algorithms";
    // const course_id = "261218";

    // const id = '6332c142e6580899c89d4fa8';
    // const course_name = "Object-Oriented Programming";
    // const course_id = "261200";

    // const id = "6332c3eee6580899c89d4fa9";
    // const course_name = "Data Structures";
    // const course_id = "261217";
    try{
        
        const check = await StudentModel.find({token:token,courses:{_id : id,course_name : course_name,course_id :course_id}});

        console.log(check);
        if(check.length !== 0){
            
            const student = await StudentModel.find({token : token});
            // console.log("check");
            // console.log(student);
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
                let i = 0;
                // let j = 0;
                for(let i = 0; i < m ;i++){
                    console.log(" i = " ,i);
                    console.log(m);
                    console.log("i = ",student[0].skills[i]);
                    let j = 0;
                    for(let j = 0; j < n;j++){
                        if(student[0].skills[i].skill_name === course[0].skills[j].skill_name){
                            courseskill[j] = true;
                            console.log(student[0].skills[i].skill_name);
                            console.log("if ==="); 
                            console.log(course[0].skills[j].skill_name);
                            if(student[0].skills[i].level_id < course[0].skills[j].level_id){
                                
                                const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });

                                const addskilllevel = { $push:{skills :{_id : course[0].skills[j]._id ,skill_name :course[0].skills[j].skill_name,level_id : course[0].skills[j].level_id,skill_like : "0",skill_self:"0" }} }
                                await StudentModel.findOneAndUpdate(token,addskilllevel,{ new: true });
                                
                            };
                        };
                    };
                };
                for(let y = 0; y < course[0].skills.length; y++){
                    if(courseskill[y] == false){
                        const addskill = { $push:{skills : {_id : course[0].skills[y]._id ,skill_name :course[0].skills[y].skill_name ,level_id : course[0].skills[y].level_id,skill_like : "0",skill_self:"0" }} }
                        await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
                    }
                }
            }
            else if(check.length === 0){
                // console.log("===");
                // const addskill = { $push:{skills :course[0].skills} }
                // await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
                for(let a = 0; a <n ;a++){
                    const addskill = { $push:{skills :{_id : course[0].skills[a]._id ,skill_name :course[0].skills[a].skill_name ,level_id : course[0].skills[a].level_id,skill_like : "0",skill_self:"0"}} }
                    await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
                }
            };
        };
        
        const final = await StudentModel.find({token : token});
        res.status(200).json(final);
    }
    catch(error){
        res.status(404).json( {message: error.message });
    };
};

// delete course
export const deleteCourse = async (req,res) =>{
    // const token = "12345";
    // const student_id = "620610777";
    // const course_name = "Object-Oriented Programming";
    // const course_id = "261200";
    const { token,course_name,course_id } = req.body;
    try{
        const deletecourse = { $pull: { courses : {course_name : course_name,course_id : course_id} } };
        
        const student = await StudentModel.findOneAndUpdate(token,deletecourse,{ new: true });
        
        // console.log(student);
        res.status(200).json(student);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};
