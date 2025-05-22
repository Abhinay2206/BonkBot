import  express, { RequestHandler } from 'express';
import { updateUser, deleteUser, getUser, getUserByEmail, updatePassword } from '../controllers/userController';

const router = express.Router();

router.put('/update', updateUser as RequestHandler);
router.delete('/delete', deleteUser as RequestHandler);
router.get('/get/:userId', getUser as RequestHandler);
router.get('/getByEmail/:email', getUserByEmail as RequestHandler);
router.put('/updatePassword', updatePassword as RequestHandler);

export default router;


