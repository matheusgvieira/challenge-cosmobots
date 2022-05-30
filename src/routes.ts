import { Router } from 'express';
import UserController from './controller/UserController';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Cosmobots API :)' });
});

router.get('/user', UserController.list);

export default router;
