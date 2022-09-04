const sharp = require("sharp");

function resizeImage(des, startName, width = 600, height = 600) {
  return function (req, res, next) {
    // console.log(" above resizeImage");
    if (!req.file) return next();
    //console.log(" after resizeImage");

    const originalName = req.file.originalname.split(".")[0];
    req.file.filename = `${startName}-${originalName}-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
      .resize(width, height)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(`public/img/${des}/${req.file.filename}`);
    next();
  };
}

module.exports = resizeImage;
