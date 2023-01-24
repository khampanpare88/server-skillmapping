import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
    token : String,
    student_name : String,
    student_id : String,
    courses : [
        {
        course_name : String,
        course_id : String,
        }
    ],
    skills : [
        {
        skill_name : String,
        level_id : String,
        skill_like : String,
        skill_self :String,
        levelmullike : String
        }
    ]
},{versionKey: false});

const StudentModel = mongoose.model('StudentModel',studentSchema);


export default StudentModel;