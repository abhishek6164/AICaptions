const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.client');
const uploadFile = require('../service/storage.service')
const {
    v4: uuidv4
} = require('uuid')

async function createPostController(req, res) {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }
        console.log("File received", file)

        const base64ImageFile = Buffer.from(file.buffer).toString('base64');

        const caption = await generateCaption(base64ImageFile);
        console.log("Generated caption:", caption);

        const result = await uploadFile(file.buffer, file.originalname);
        console.log('Upload result keys:', Object.keys(result || {}).slice(0, 10));

        const imageUrl = result?.url || result?.filePath || result?.name || '';

        const post = await postModel.create({
            caption: caption,
            image: imageUrl,
            user: req.user._id
        })

        return res.status(201).json({
            message: "Post created successfully",
            post
        })
    } catch (err) {
        console.error('Error creating post:', err);
        return res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
}

module.exports = {
    createPostController
};