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

//add courses
export const addCourses = async (req,res) =>{
    const { student_id,courses} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(student_id)) return res.status(404).send(`No post with id: ${student_id}`);

        const addCourses = { courses };

        await StudentModel.findByIdAndUpdate(student_id, addCourses, { new: true });

        res.json(addCourses);

};

//add skills by courses
// export const addSkillByCourses = async (req,res) =>{
//     // const { student_id } = req.body;
//         const  student_id  = "620610777";
//         const  id  = "261200";
//         // const token = 12345;
//         try{
//             // const student = await StudentModel.find({token : token});
//             const student = await StudentModel.find({ student_id });
//             const course = await CoursesModel.find({ id });
//             console.log(course[0]);
//             console.log(course[0].skills[0]);
//             // console.log(courses[0].skills[0]);
//             // console.log(student[0].skills[0].skill_name);
//             res.status(200).json(student);
//         } catch(error){
//             res.status(404).json( {message: error.message });
//         }
// };
// export const addSkillByCourses = async (req,res) =>{
//     const { student_id } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(student_id)) return res.status(404).send(`No post with id: ${student_id}`);
//     if(skill_name == "coding"){
//         const addLikeskills = { level_id };

//         await StudentModel.findByIdAndUpdate(student_id, addLikeskills, { new: true });

//         res.json(addLikeskills);
//     };

// };


//add like skill
export const addLikeskills = async (req,res) =>{
    const { student_id, skills } = req.body;
    

    if (!mongoose.Types.ObjectId.isValid(student_id)) return res.status(404).send(`No post with id: ${student_id}`);

        const addLikeskills = { skills };

        await StudentModel.findByIdAndUpdate(student_id, addLikeskills, { new: true });

        res.json(addLikeskills);

};



// edit courses
// export const Updatecourses = async (req,res) =>{
//     const { student_id, course_name } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(student_id)) return res.status(404).send(`No post with id: ${student_id}`);

//         const Updatecourses = { course_name };

//         await StudentModel.findOneAndUpdate(student_id, Updatecourses, { new: true });

//         res.json(Updatecourses);

// };


//delete course
// export const deleteCourse = async (req,res) =>{
//     // const { student_id, course_name, course_id } = req.body;
//     const student_id = '620610777'
//     const course_name = "Object-Oriented Programming";
//     const course_id = "261200";

//         const deleteCourse = { course_name,course_id };

//         await StudentModel.findByIdAndDelete(student_id, deleteCourse, { new: true });

//         res.json(deleteCourse);

// };

