import QuestionModel from "../models/question.js";
import QuestModel from "../models/quest.js";

class Question {
    model;
    constructor() {
        this.model = QuestionModel;
    }

    async getList(){
        return await this.model.find({});
    }

    async addQuestion(data) {
        let question = new this.model({
            title: data.title,
            description: data.description,
            quest: data.quest,
            answers: data.answers
        })

        await question.save(function (err, doc) {
            if(doc){
                return doc._id
            }
            if(err){
                return JSON.stringify(err)
            }
        })
    }

    async getListByQuestId(id){
        let data = await this.model.find({quest:id});
        return data;
    }

    async delete(id) {
        await this.model.deleteOne( { _id: id } );
        return this.model.countDocuments({ _id: id })
    }

   /*
    async editQuestion(id, updatedData) {
        return await this.questModel.findOneAndUpdate({_id:id},updatedData)
    }*/
}
export default Question;