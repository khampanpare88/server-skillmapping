import express from 'express';
import { get } from 'mongoose';

import { getCareers,getCareer } from '../controllers/career.js';

const router = express.Router();

router.get( '/' , getCareers );
router.get( '/:id' , getCareer );

export default router;