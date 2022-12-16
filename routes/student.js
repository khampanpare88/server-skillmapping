import express from 'express';
import { get } from 'mongoose';

import { getStudent,addCourses,addLikeskills } from '../controllers/student.js';

const router = express.Router();

// router.get( '/' , getStudent);
router.get( '/:token' , getStudent);
router.post( '/courses',addCourses)
router.post( '/likes',addLikeskills)
// router.post( '/skilllevel' , addSkillByCourses);


export default router;