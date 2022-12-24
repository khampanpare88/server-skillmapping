import express from 'express';
import { get } from 'mongoose';

import { getStudent,addCourses,addLikeskills,addSelfkills,deleteCourse } from '../controllers/student.js';

const router = express.Router();

// router.get( '/' , getStudent);
router.get( '/:token' , getStudent);
router.post( '/courses',addCourses);
router.post( '/likes',addLikeskills);
router.post( '/selfs',addSelfkills);
// router.post( '/skilllevel' , addSkillByCourses);
router.delete( '/delete',deleteCourse);
// router.post( '/edit',Updatecourses);


export default router;