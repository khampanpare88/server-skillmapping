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

// // show some courses
// export const getCourses = async (req,res) =>{
//     try{
//         // const id = "261434";
//         const courses = await CoursesModel.find({id :"261200"});
//         console.log(courses[0].skills);
//         //console.log(courses);
       
//         res.status(200).json(courses);
//     } catch(error){
//         res.status(404).json( {message: error.message });
//     }
// };



//add like and self skill
export const addLikeskills = async (req,res) =>{

    const token = "12345";
    const skill_name = "Coding";
    const skill_like = "4";
    const id = "6384744a07c740173a3d430c";

    // const { token,course_name,id,skill_like } = req.body;
    try{

        const find = await StudentModel.find({token :token});
        console.log(find[0].skills.length);
        const n = find[0].skills.length;
        // while(){

        // }
        const addLikeskills = { $push: { skills : {skill_like :skill_like }}};
        
        const student = await StudentModel.findOneAndUpdate(token,addLikeskills,{ new: true });
        
        // console.log(student);
        res.status(200).json(student);
    } catch(error){
        res.status(404).json( {message: error.message });
    }

};
//add course
export const addCourses = async (req,res) =>{
    // const { id,token,course_name,course_id } = req.body;

    const token = "12345";

    const id = "63330116d039104ac57efe11";
    const course_name = "Algorithms";
    const course_id = "261218";

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

            const check = await StudentModel.find({token:token, skills : student[0].skills});
            // console.log(check);
            if(check.length !== 0){
                // console.log("!==");
                const n = course[0].skills.length;
                const m = student[0].skills.length;
                let i = 0;
                let j = 0;
                while( i < m ){
                    console.log(" i = " ,i);
                    console.log(m);
                    console.log("i = ",student[0].skills[i]);

                    while( j < n ){
                        console.log(" j = " ,j);
                        console.log(n);
                        console.log(" j = " ,course[0].skills[j]);
                        if(student[0].skills[i].skill_name === course[0].skills[j].skill_name){
                            console.log(student[0].skills[i].skill_name);
                            console.log("if ==="); 
                            console.log(course[0].skills[j].skill_name);
                            if(student[0].skills[i].level_id === course[0].skills[j].level_id){
                                await StudentModel.find({token : token});
                            }
                            else if(student[0].skills[i].level_id > course[0].skills[j].level_id){
                                await StudentModel.find({token : token});
                            }
                            else if(student[0].skills[i].level_id < course[0].skills[j].level_id){
                                
                                const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                                await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });

                                const addskilllevel = { $push:{skills :course[0].skills[j]} }
                                await StudentModel.findOneAndUpdate(token,addskilllevel,{ new: true });
                                
                            };
                            // break;
                        }
                        else if(student[0].skills[i].skill_name !== course[0].skills[j].skill_name){
                            const addskill = { $push:{skills : course[0].skills[j] } }
                            await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
                            console.log(student[0].skills[i].skill_name);
                            console.log("if !==");
                            console.log(course[0].skills[j].skill_name);
                        };
                        j++;
                    };
                    // for(let j = 0; j < n ; j++){
                    //     console.log(" j = " ,j);
                    //     console.log(n);
                    //     console.log(" j = " ,course[0].skills[j]);

                    //     if(student[0].skills[i].skill_name === course[0].skills[j].skill_name){
                    //         console.log(student[0].skills[i].skill_name);
                    //         console.log("if ==="); 
                    //         console.log(course[0].skills[j].skill_name);
                            
                    //         // if(student[0].skills[i].level_id === course[0].skills[j].level_id){
                    //         //     await StudentModel.find({token : token});
                    //         // }
                    //         // else if(student[0].skills[i].level_id > course[0].skills[j].level_id){
                    //         //     await StudentModel.find({token : token});
                    //         // }
                    //         // else 
                    //         if(student[0].skills[i].level_id < course[0].skills[j].level_id){
                    //             const deleteskilllevel = { $pull:{skills : student[0].skills[i] } }
                    //             await StudentModel.findOneAndUpdate(token,deleteskilllevel,{ new: true });
                    //             const addskilllevel = { $push:{skills :course[0].skills[j]} }
                    //             await StudentModel.findOneAndUpdate(token,addskilllevel,{ new: true });
                    //         };
                    //     }
                    //     else if(student[0].skills[i].skill_name !== course[0].skills[j].skill_name){

                    //         const addskill = { $push:{skills : course[0].skills[j]} }
                    //         await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
                    //         console.log(student[0].skills[i].skill_name);
                    //         console.log("if !==");
                    //         console.log(course[0].skills[j].skill_name);
                    //     };

                    // };

                    
                    // const student2 = await StudentModel.find({token:token});
                    // m = student2[0].skills.length;
                    i++;
                };
            }
            else if(check.length === 0){
                console.log("===");
                const addskill = { $push:{skills :course[0].skills} }
                await StudentModel.findOneAndUpdate(token,addskill,{ new: true });
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
    const { student_id,course_name,course_id } = req.body;
    try{
        const deletecourse = { $pull: { courses : {course_name : course_name,course_id : course_id} } };
        
        const student = await StudentModel.findOneAndUpdate({student_id :student_id},deletecourse,{ new: true });
        
        // console.log(student);
        res.status(200).json(student);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};
