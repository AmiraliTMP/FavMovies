const { request } = require("express");
const transforms = require("../../../utilities/apiResponse");
const Validators = require("../../../utilities/Validator");
const PackagesRepository = require("../repositories/packages.repository");
const packagesRepository = require("../repositories/packages.repository");
const userrepo=require("../../user/repositories/user.repositories")

module.exports = (new (class packageService {
    async createPackage(req, res) {
        const { name, price, days, description } = req.body ;
        const finddays = await PackagesRepository.findOne({ days });
        const findprice = await PackagesRepository.findOne({ price });
        if (finddays) {
            return await transforms.BadRequest(res, "مدت زمان تکراری است", "The days is repetitive", "days");
        }
        if (findprice) {
            return await transforms.BadRequest(res, "قیمت تکراری است", "The price  is repetitive", "price");
        }

        const newpackage=  await PackagesRepository.create({name, price, days, description});
        return await transforms.successRespond(res, "بسته با موفقیت ثبت شد", "The package has been successfully registered", "package", newpackage);
    }
    async getAllPackages(req, res) {
        const limit = (await req.query.limit) ? req.query.limit : 40;
        const page = (await req.query.page) ? req.query.page : 1;
        const $and = [{ isDeleted: false }];
        const search = (await req.query.search) ? req.query.search : null;
        const pagination = req.query.pagination === "true";  

    if (search) {
      $and.push({ name: { $regex: search, $options: "i" } });
    }
    let allPackages
    const finalQuery = { $and };
    if(pagination){
    const options = {
      page: page,
      limit: limit,
    };

        allPackages=  await PackagesRepository.paginate(finalQuery, options);
    }    
    else{
        allPackages = await packagesRepository.findAll(finalQuery)
    }
        return await transforms.successRespond(res, "لیست بسته ها", "List of packages", allPackages);
    }
    async getPackageById(req, res) {
        const { id } = req.params;
        const pack = await PackagesRepository.getById( id );
        return await transforms.successRespond(res, "بسته یافت شد", "Package found", pack);
    }
    async updatePackage(req, res) {
        const { id, name, price, days, description } = req.body;
        const findpackage = await PackagesRepository.getById(id);
        
        const finddays = await PackagesRepository.findOne( {days , _id : { $ne :  id }} );
        const findprice = await PackagesRepository.findOne({ price ,_id: { $ne: id } });
        if (!findpackage) {
            return await transforms.notFoundRespond(res, "بسته مورد نظر یافت نشد", "The package is not  found ");
        }
        if (finddays) {
            return await transforms.BadRequest(res, "مدت زمان تکراری است", "The days is repetitive", "days");
        }
        if (findprice) {
            return await transforms.BadRequest(res, "قیمت تکراری است", "The price  is repetitive", "price");
        }
        console.log(id);
        
        
        const updatedpackage = await PackagesRepository.update(id, { name, price, days, description });
        return await transforms.successRespond(res, "بسته با موفقیت ویرایش شد", "The package has been successfully updated", "package", updatedpackage);
    }
    async deletePackage(req, res) {
        const { id } = req.body;
        const findpackage = await PackagesRepository.getById(id);
        if (!findpackage) {
            return await transforms.notFoundRespond(res, "بسته مورد نظر یافت نشد", "The package is not  found ");
        }

        findpackage.isDeleted = await true;
        await findpackage.save();
        return await transforms.successRespond(res, "بسته با موفقیت حذف شد", "The package has been successfully deleted", "package");
    }
    async getAllpackageUser(req, res) {
        const allPackages = await PackagesRepository.getAll({ isDeleted: false });
        return await transforms.successRespond(res, "لیست بسته ها", "List of packages", allPackages);
    }
    async deletePackageSelected(req,res){
        const {packages} =await req.body
             if (!packages || !Array.isArray(packages)) {
                  return transforms.BadRequest(res,"آیدی  پکیج  ها را به صورت صحیح ارسال کنید ","id's must be sent in array ");
                }
            const result = await packagesRepository.deleteList(packages)
            return transforms.successRespond(res,"پکیج ها با موفقیت حذف شد ","packages successfuly deleted")
    }
    // async addMoreTime(req,res){
    //     const { user_id, time } = req.body; 
    //     const find_user = await userrepo.findOne({ _id: user_id });
    //     if (!find_user) {
    //       return transforms.notFoundRespond(res, "کاربری یافت نشد", "user not found");
    //     }
    //     if (!find_user.expiredDatepackage) {
    //       return transforms.BadRequest(res, "اشتراکی برای این کاربر ثبت نشده است", "there is no package for this user");
    //     }
    //     const now = new Date();
    //     const currentExpire = new Date(find_user.expiredDatepackage);
    //     const baseDate = currentExpire > now ? currentExpire : now;
    //     const newExpire = new Date(baseDate.getTime() + time * 24 * 60 * 60 * 1000);
    //     find_user.expiredDatepackage = newExpire;
    //     await find_user.save();
      
    //     return transforms.successRespond(res, "تاریخ جدید برای انقضا اشتراک ثبت شد ", "added more time for expire date package for user");

    // }
}));