// const fileRepository = require('../repositories/file.repository');
// // const status = require('../../../constants/status.constant');
// const transforms = require("../../../utilities/transform");

// module.exports = new class filePack {

//     async upload(request, response) {
//         try{
//             let data={
//                 fieldName:request.file.fieldname,
//                 originalName:request.file.originalname,
//                 encoding:request.file.encoding,
//                 mimetype:request.file.mimetype,
//                 destination:request.file.destination,
//                 fileName:request.file.filename,
//                 path:String(request.file.path).replace(/\\/g, '/').replace("uploads", ""),
//                 size:request.file.size,

//             }
//             // if(request.body.type) data.type = await request.body.type;

//             if(request.file.size > (100 * 100 * 100 * 6)){
//                 return transforms.invalidData(response, "حجم فایل آپلود باید کمتر از 6 مگابایت باشد")
//             }

//             const file =  await fileRepository.create(data)

//             return await transforms.success(response, file, "ok");
//         }

//         catch (err){
//             return await transforms.invalidData(response, "فایل ارسالی معتبر نیست!")
//         }

//     }

//     async details(id, response) {
//         return await fileRepository
//         .findById(id)
//             .where({ isDeleted: false })
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {

//         })
//     }

//     async delete(request, response) {
//         return await fileRepository.delete(id)
//         .then((data) => {
//             return data
//         })
//         .catch((error) => {

//         })
//     }

//     async search(body) {
//         let $and = [];
//         // $and.push({ status: status.ACCEPTED});
//         $and.push({ isActive: true });
//         $and.push({ isVerified: false });
//         $and.push({ isDeleted: false });

//         let finalQuery =null;
//         if(body.searchText===""){
//             finalQuery = {
//                 $and
//             };
//         } else {
//             finalQuery = {
//                 $and,
//                 $or: [
//                     { post_title: { $regex: body.searchText , $options:'i' } },
//                     { sku: { $regex: body.searchText , $options:'i' } },
//                 ],
//             };
//         }

//         let options = {
//             page: body.pageNumber,
//             // sort: { insertDate: body.sortMode },
//             populate: [
//                 // {
//                 //     path: 'photo',
//                 //     select: '_id originalName filename',
//                 // },
//             ],
//             // select:'',
//             limit: body.limit
//         };

//         return await fileRepository
//         .paginate(finalQuery,options)
//         .then((data) => {
//             return data;
//         })
//         .catch((error) => {
//             console.log(error);
//         });

//     }

// }
