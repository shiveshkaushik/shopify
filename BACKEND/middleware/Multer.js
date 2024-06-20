const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadSingleFile = upload.single('userImage');

module.exports = {uploadSingleFile};
