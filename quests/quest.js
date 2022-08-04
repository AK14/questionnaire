import QuestModel from "../models/quest.js";
import Question from "../questions/question.js";

let  question = new Question();

 class Quest {
    questModel;
    constructor() {
        this.questModel = QuestModel;
    }

    async getList(){
        return await this.questModel.find({});
    }

    async getById(id){
        let result = {};
        let data = await this.questModel.findOne({_id:id});
        let questions =  await question.getListByQuestId(id);

       result.id = data._id;
       result.title = data.title;
       result.description = data.description
       result.questions = questions;

        return result;
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

export default Quest;