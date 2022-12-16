import mongoose from 'mongoose';

const careerSchema = mongoose.Schema({
    name_career : String,
    des_eng : String,
    des_thai : String,
    skills : [
        {
        level_id : String,
        skill_name : String,
        }
    ]
},{versionKey: false});

const careersModel = mongoose.model('careersModel',careerSchema);

export default careersModel;