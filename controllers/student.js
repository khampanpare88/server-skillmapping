import StudentModel from '../models/studentmodent.js';

//show datastudent
export const getStudent = async (req,res) =>{
    // const token = 12345;
    const {token} = req.body;
    try{
        // const student = await StudentModel.find({token : token});
        const student = await StudentModel.find(token);
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

        await CoursesModel.findByIdAndUpdate(student_id, addCourses, { new: true });

        res.json(addCourses);

}

// edit courses
// export const Updatecourses = async (req,res) =>{
//     const { student_id, courses } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(student_id)) return res.status(404).send(`No post with id: ${student_id}`);

//         const Updatecourses = { courses };

//         await CoursesModel.findByIdAndUpdate(student_id, Updatecourses, { new: true });

//         res.json(Updatecourses);

// }