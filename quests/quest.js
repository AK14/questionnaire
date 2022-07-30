const mongoose = require("mongoose");

console.log('aaa');

class Quest {
    questModel;
    constructor() {
        // create mongoose schema
        const questSchema = new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true,
            }
        });
        // create mongoose db model
        this.questModel = mongoose.model('Quest', questSchema);
    }

    async getList(){
        return  await this.questModel.find({});
    }

    async addQuest(data) {
         let quest = new this.questModel({
             title: data.title,
             description: data.description
         })

         await quest.save(function (err, doc) {
             return doc._id
         })
    }

    async deleteQuest(id) {
       await this.questModel.deleteOne( { _id: id } );
       return this.questModel.countDocuments({ _id: id })
    }

    async editQuest(id, updatedData) {
        return await this.questModel.findOneAndUpdate({_id:id},updatedData)
    }
}
module.exports = Quest;