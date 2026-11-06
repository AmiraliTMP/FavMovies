const fileRepository = require("../repositories/file.repository");
const transforms = require("../../../utilities/apiResponse");
const path = require("path");
const fs = require("fs");

module.exports = new (class fileController {
  async upload(request, response) {
    try {
      let data = {
        fieldName: request.file.fieldname,
        originalName: request.file.originalname,
        encoding: request.file.encoding,
        mimetype: request.file.mimetype,
        destination: request.file.destination,
        fileName: request.file.filename,
        path: String(request.file.path)
          .replace(/\\/g, "/")
          .replace("uploads", ""),
        size: request.file.size,
      };
      // if(request.body.type) data.type = await request.body.type;

      if (request.file.size > 100 * 100 * 100 * 6) {
        return transforms.BadRequest(
          response,
          "حجم فایل آپلود باید کمتر از 6 مگابایت باشد"
        );
      }

      const file = await fileRepository.create(data);

      return await transforms.successRespond(response, file, "ok");
    } catch (err) {
      return await transforms.BadRequest(response, "فایل ارسالی معتبر نیست!");
    }
  }

  // async getFile(req, res) {
  //   const filePath = await path.join(__dirname, "uploads", req.params.filename);

  //   if (fs.existsSync(filePath)) {
  //     res.sendFile(filePath);
  //   } else {
  //     res.status(404).json({ message: "File not found" });
  //   }
  // }

  //   async details(request, response) {
  //     return await filePack
  //       .details(request.params.id)
  //       .then((data) => {
  //         return transforms.success(response, data);
  //       })
  //       .catch((error) => {});
  //   }

  //   async delete(request, response) {
  //     return await filePack
  //       .details(request.params.id)
  //       .then((data) => {
  //         return transforms.success(response, data);
  //       })
  //       .catch((error) => {});
  //   }

  //   async search(request, response) {
  //     return await filePack
  //       .search(request.body)
  //       .where({ isDeleted: false })
  //       .then((data) => {
  //         return transforms.success(response, data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
})();
