import express from 'express';
import { get } from 'mongoose';

import { getStudent,addCourses,addLikeskills,addSelfkills,deleteCourse } from '../controllers/student.js';
import { SkilltoCareer } from '../controllers/mapping.js';
const router = express.Router();

// router.get( '/' , getStudent);
router.get( '/:token' , getStudent);
router.post( '/courses',addCourses);
router.post( '/likes',addLikeskills);
router.post( '/selfs',addSelfkills);
// router.post( '/skilllevel' , addSkillByCourses);
router.post( '/delete',deleteCourse);
// router.get( '/mapping_career/:token',SkilltoCareer);


export default router;