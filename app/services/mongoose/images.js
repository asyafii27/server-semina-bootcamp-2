const Images = require('../../api/v1/images/model');
// cara 1
const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : 'uploads/avatar/default.png',
  });

  return result;
};

// cara 2
// generate url setelah submit baru simpan images

module.exports = { createImages };