const packagesService = require("../service/packages.service");

const transforms = require("../../../utilities/apiResponse");

module.exports = new (class CarsController {
  async insertPackage(req, res) {
    return await packagesService.createPackage(req, res);
  }
   async getAllPackages(req, res) {
    return await packagesService.getAllPackages(req, res);
    }
    async getPackageById(req, res) {
        return await packagesService.getPackageById(req, res);
    }
    async updatePackage(req, res) {
        return await packagesService.updatePackage(req, res);
    }
    async deletePackage(req, res) {
        return await packagesService.deletePackage(req, res);
    }
    async deletePackageSelected(req, res) {
        return await packagesService.deletePackageSelected(req, res);
    }
    async getAllpackageUser(req, res) {
        return await packagesService.getAllpackageUser(req, res);
    }
    async addMoreTime(req,res){
        return await packagesService.addMoreTime(req,res);
    }
})();
