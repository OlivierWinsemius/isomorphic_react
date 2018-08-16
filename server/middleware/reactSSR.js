import express from 'express';
import path from 'path';
import views from '../views';

const router = express.Router();

router.use('/build', express.static(path.join(__dirname, '../../dist/prod')));
router.use('/', views);

export default router;
