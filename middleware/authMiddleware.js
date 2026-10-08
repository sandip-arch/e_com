// const jwt= require('jsonwebtoken');

// const authMiddleware = async(req,res,next)=>{
//     const token=req.cookies.token;
//     if(!token){
//           if (req.path.startsWith('/process') ||
//             req.path.startsWith('/create')) {

//             return res.status(401).json({
//                 success: false,
//                 message: 'Authentication required'
//             });

//         }
//         return res.redirect('/login');
//     }
//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         req.user=decoded;
//         next();
//     }
//     catch(error){
//           console.error(
//             'JWT authentication error:',
//             error.message
//         );


//         // API request
//         if (req.path.startsWith('/process') ||
//             req.path.startsWith('/create')) {

//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid or expired authentication token'
//             });

//         }
//         res.redirect('/login');
//     }
// }
// module.exports=authMiddleware;


const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    // -----------------------------------------
    // NO TOKEN
    // -----------------------------------------

    if (!token) {

        // API requests should return JSON
        if (
            req.method === 'POST' &&
            (
                req.originalUrl === '/payment/create' ||
                req.originalUrl === '/payment/process'
            )
        ) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        // Normal webpage request
        return res.redirect('/login');
    }


    // -----------------------------------------
    // VERIFY JWT
    // -----------------------------------------

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.error(
            'JWT verification error:',
            error.message
        );


        // API requests should return JSON
        if (
            req.method === 'POST' &&
            (
                req.originalUrl === '/payment/create' ||
                req.originalUrl === '/payment/process'
            )
        ) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired authentication token'
            });
        }


        // Normal webpage request
        return res.redirect('/login');
    }
};

module.exports = authMiddleware;