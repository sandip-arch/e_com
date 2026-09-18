const router=require('express').Router();
const authMiddleware=require('../middleware/authMiddleware');
const {render_index,render_login,render_register,render_user}=require('../controllers/renderControllers');
const {register,login}=require('../controllers/authController');
//get routes
router.get('/',render_index);
router.get('/login',render_login);
router.get('/register',render_register);
router.get('/user',authMiddleware,render_user);

//post routes
router.post('/register',register);
router.post('/login',login);
module.exports=router;




