const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');
const uploadFile = require('../service/storage.service')
const {
    v4: uuidv4
} = require('uuid')

async function createPostController(req, res) {
    const file = req.file;
    console.log("File received", file)

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64');
    
    const caption = await generateCaption(base64ImageFile);
    console.log("Generated caption:", caption);

    const result = await uploadFile(file.buffer, file.originalname);

    const post= await postModel.create({
        caption:caption,
        image:result.url,
        user:req.user._id
    })

res.status(201).json({
    message:"Post created successfully",
    post
})


    res.json({
        caption,
        result
    })
}

module.exports = {
    createPostController
};