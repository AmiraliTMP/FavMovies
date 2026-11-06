
const { model } = require("mongoose");
const Model = require("../models/packages.model");
const packagesModel = require("../models/packages.model");

module.exports = (new class PackagesRepository {
    async create(data) {
        return await Model.create(data);
    }
    async update(id, data) {
        return await Model.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return await Model.findByIdAndDelete(id);
    }
    async getById(id) {
        return await Model.findById(id);}
        
    async getAll() {
        return await Model.find({isDeleted:false})
       
    }
    async findAll(condition){
        return await Model.find(condition)
    }
    async findById(id) {
        return await Model.findById(id);
    }
    async findOne(condition) {
        return await Model.findOne(condition);
    }

    async paginate(query, options) {
        return await Model.paginate(query, {
            ...options,
        });        
    }
    async deleteList(condition){
        return await packagesModel.updateMany({_id:{$in:condition} },{ $set: { isDeleted: true }})
    
      }
    
});