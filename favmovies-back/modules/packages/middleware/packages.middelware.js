const transforms = require("../../../utilities/apiResponse");
const Validators = require("../../../utilities/Validator");
const packagesModel = require("../models/packages.model");

module.exports = (new (class PackagesMiddleware {
    async insetPackage(req, res, next) {
        const { name, price, days, description } = req.body;
        if (typeof name !== "string") {
            return await transforms.BadRequest(res, "نام باید به صورت کارکتری باشد  ","نام باید به صورت کارکتری باشد  ","name");
        };
        if (typeof price !== "number") {
            return await transforms.BadRequest(res, "قیمت باید به صورت عددی باشد  ","قیمت باید به صورت عددی باشد  ","price");
        };
        if ( typeof days !== "number") {
            return await transforms.BadRequest(res, "مدت زمان باید به صورت عددی باشد  ","مدت زمان باید به صورت عددی باشد  ","days");
        };
        if (typeof description !== "string") {
            return await transforms.BadRequest(res, "توضیحات باید به صورت کارکتری باشد  ","توضیحات باید به صورت کارکتری باشد  ","description");
        };
        return await next();}





    async updatePackage(req, res, next) {
        const {name, price, days, description, id} = req.body;
        if (id) {
            if ( !Validators.IsObjectId(id)) {
                return await transforms.BadRequest(res, "شناسه باید به صورت شناسه باشد  ","شناسه باید به صورت شناسه باشد  ","id");
            };
        };
        if (name) {
            if (typeof name !== "string") {
                return await transforms.BadRequest(res, "نام باید به صورت کارکتری باشد  ","نام باید به صورت کارکتری باشد  ","name");
            };
        };
        if (price) {
            if (typeof price !== "number") {
                return await transforms.BadRequest(res, "قیمت باید به صورت عددی باشد  ","قیمت باید به صورت عددی باشد  ","price");
            };
        };
        if (days) {
            if (typeof days !== "number") {
                return await transforms.BadRequest(res, "مدت زمان باید به صورت شناسه باشد  ","مدت زمان باید به صورت شناسه باشد  ","duration");
            };
        };
        if (description) {
        if (typeof description !== "string") {
            return await transforms.BadRequest(res, "توضیحات باید به صورت کارکتری باشد  ","توضیحات باید به صورت کارکتری باشد  ","description");
        };
        };

        return await next();}






    async deletePackage(req, res, next) {
        const {id} = req.params;
        if ( !Validators.IsObjectId(id)) {
            return await transforms.BadRequest(res, "شناسه باید به صورت شناسه باشد  ","id must be a objectid","id");
        };
        return await next();}






    async getPackages(req, res, next) {
        return await next();}





    async getPackageByDuration(req, res, next) {
        const {id} = req.params;
        if ( !Validators.IsObjectId(id)) {
            return await transforms.BadRequest(res, "شناسه باید به صورت شناسه باشد  ","شناسه باید به صورت شناسه باشد  ","id");
        };
        return await next();}





    async getPackageById(req, res, next) {
        const {id} = req.params;
        if ( !Validators.IsObjectId(id)) {
            return await transforms.BadRequest(res, "شناسه باید به صورت شناسه باشد  ","شناسه باید به صورت شناسه باشد  ","id");
        };
        return await next();}

    // async deletePackagesSelected(req,res,next){
    //         const {packages} = req.body
    //         for (let id of packages){
    //         if ( !Validators.IsObjectId(id)) {
    //             return await transforms.BadRequest(res, "شناسه باید به صورت شناسه باشد  ","id must be a objectid ","id");
    //         };
    //         }   
    
    //     }
  }))
