const express=require('express')

const router=express.Router();

const controller=require('../controller/usecon')

router.post('/SignUp',controller.UserSignup)
router.put('/adminUpdate/:id',controller.adminUpdate)
router.delete('/adminDelete/:id',controller.adminDelete)
router.post('/Login',controller.UserLogin)
router.get('/VerifyToken',controller.VerifyToken,controller.getid)
router.get('/getsingleuser/:id',controller.getsingleuser)
router.get('/adminDisplay',controller.adminDisplay)
router.get('/Refresh',controller.Refresh,controller.VerifyToken,controller.getid)
router.post('/Logout', controller.VerifyToken, controller.Logout)



module.exports = router;




