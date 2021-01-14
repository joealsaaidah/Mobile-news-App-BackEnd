import {check, validationResult} from 'express-validator'

const acceptedCategorys = ['tech','political','entertainment']

const validator = [
    check('title').trim().not().isEmpty().withMessage('Title is required!'),
    check('content').trim().not().isEmpty().withMessage('Must have some content!'),
    check('category').isIn(acceptedCategorys).withMessage('Select at least one category')

]

const result = (req, res,next)=>{
    const result = validationResult(req)
    const hasError = !result.isEmpty()

    if(hasError){
        const error = result.array()[0].msg
        res.json({success: false, message: error})
    }
    next()
}

const validateFile = (req, res,next)=>{
    const acceptedFileType = ['png','jpg','jpeg']
    if(!req.file){
        return res.json({success: false, message:'Image is required!'})
    }
    const fileExtension = req.file.mimetype.split('/').pop();
    if(!acceptedFileType.includes(fileExtension)){
        return res.json({success: false, message:'Image file is not supported!'})
    }
    next()
}

export {validator,result,validateFile}