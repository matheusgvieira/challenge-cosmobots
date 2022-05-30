import { Router } from 'express';
import GroupsController from './controller/GroupsController';
import UserController from './controller/UserController';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Cosmobots API :)' });
});

router.get('/user', UserController.list);
router.get('/user/:id', UserController.show);
router.get('/user/retrieve/:id', UserController.retrieve);
router.put('/user/:id', UserController.update);
router.post('/user', UserController.create);
router.delete('/user/:id', UserController.delete);

router.get('/groups', GroupsController.list);
router.get('/groups/:id', GroupsController.listUserByGroupsId);

export default router;
