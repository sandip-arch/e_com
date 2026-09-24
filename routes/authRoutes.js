const router=require('express').Router();
const { getCheckoutUser } = require('../temp/checkOut'); //later change this 
const authMiddleware=require('../middleware/authMiddleware');
const {render_index,render_login,render_register,render_user,render_forgotPassword, render_verifyOtp,render_changePassword}=require('../controllers/renderControllers');
const {register,login,forgotPassword,verifyOtp,changePassword}=require('../controllers/authController');
//get routes
router.get('/',render_index);
router.get('/login',render_login);
router.get('/register',render_register);
router.get('/user',authMiddleware,render_user);
router.get('/forgotPassword',render_forgotPassword);
router.get('/verifyOtp',render_verifyOtp);
router.get('/changePassword',render_changePassword);
router.get('/checkout', authMiddleware, async (req, res) => {

    try {

        const userId = req.user.id;

        const user = await getCheckoutUser(userId);

        res.render('checkout', {
            user: user
        });

    } catch (error) {

        console.error(error);

        res.status(500).send('Unable to load checkout information');

    }

});
//post routes
router.post('/register',register);
router.post('/login',login);
router.post('/forgotPassword',forgotPassword)
router.post('/verifyOtp',verifyOtp)
router.post('/changePassword',changePassword);
module.exports=router;




