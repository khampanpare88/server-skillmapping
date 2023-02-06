import CoursesModel from '../models/coursesmodel.js';
import mongoose from 'mongoose';

export const getCourses = async (req,res) =>{
    try{
        const courses = await CoursesModel.find();
        
        // const n = courses[0].skills.length;
        // console.log(courses[0].skills,n);
        
       
        res.status(200).json(courses);
    } catch(error){
        res.status(404).json( {message: error.message });
    }
};


export const UpdateorNew = async (req,res) =>{
    const { course_id, topic,skills,isSelTopic } = req.body;
    //console.log(req.body);
    const sel_topic = topic;
    // console.log(skills[0].skill_name,skills[0].level_id);
    // console.log(skills[1].skill_name,skills[1].level_id);
    if( isSelTopic == true /*เป็นseltopic*/){
        const seltopic = await CoursesModel.find({_id : course_id});
        const Courses = new CoursesModel({ id : course_id ,name : seltopic[0].name,sel_topic,skills})
            try {
                await Courses.save();
        
                res.status(201).json (Courses );
            } catch (error) {
                res.status(409).json({ message: error.message });
            }



        if(course_id == '6335309e1145d8b493deb6a3' ){
            const Courses = new CoursesModel({ id : "261498",name : "Selected Topics in Computer Networks" , sel_topic,skills})
            try {
                await Courses.save();
        
                res.status(201).json (Courses );
            } catch (error) {
                res.status(409).json({ message: error.message });
            }

        }
    }
    else{
        // const { course_id,skills } = req.body;

        //console.log(req.body);
        //console.log(skills);

        if (!mongoose.Types.ObjectId.isValid(course_id)) return res.status(404).send(`No post with id: ${course_id}`);

        const updatedCoursesSkill = { skills };

        await CoursesModel.findByIdAndUpdate(course_id, updatedCoursesSkill, { new: true });

        res.json(updatedCoursesSkill);

        //console.log(res);
    }

}