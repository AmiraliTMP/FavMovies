const fileModel =require('../models/file.model');

module.exports = new class fileRepository {
    
    async create(data) {
        return await fileModel
            .create(data)
            .then((created) => {
                return created
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async findById(id) {
        return await fileModel
        .findById(id)
            .where({isDeleted:false})
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async delete(id) {
        return await fileModel
        .findByIdAndRemove(id)
        .then((data) => {
            return data
        })
        .catch((error) => {

        })
    }

    async findAll(request, response) {
        return await fileModel
        .find()
        .where({isDeleted:false})
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log(error);
        })
    }

    async paginate(finalQuery, options) {
        return await fileModel.paginate(finalQuery, options, (error, data) => {
            if (error) {
                return error;
            } else {
                return data;
            }
        });
    }
}