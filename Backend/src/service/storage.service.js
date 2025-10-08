const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const path = require('path');

async function uploadFile(file, filename) {
    // pick extension from original filename or fall back to mimetype
    let ext = '';
    if (filename) ext = path.extname(filename);
    if (!ext && file && file.mimetype) {
        const mt = file.mimetype.toLowerCase();
        if (mt === 'image/jpeg' || mt === 'image/jpg') ext = '.jpg';
        else if (mt === 'image/png') ext = '.png';
        else if (mt === 'image/gif') ext = '.gif';
        else if (mt === 'image/webp') ext = '.webp';
    }

    const base = filename ? path.basename(filename, path.extname(filename)).replace(/[^a-z0-9-_]/gi, '-') : 'upload';
    const safeFilename = `${Date.now()}-${base}${ext}`;

    try {
        const response = await imagekit.upload({
            file: file,
            fileName: safeFilename,
            folder: "Cohort-ai-social"
        });
        // log a short preview for debugging
        try {
            console.log('ImageKit upload response preview:', JSON.stringify(response).slice(0, 500));
        } catch (e) {}
        return response;
    } catch (err) {
        console.error('ImageKit upload error:', err && err.message ? err.message : err);
        throw err;
    }
}

module.exports = uploadFile