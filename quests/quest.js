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

    getList(){
        const quests = this.questModel.find({});
        return quests;
    }

    // Filter a todo out of the array by id
    async deleteQuest(id) {
       await this.questModel.deleteOne( { _id: id } );
       return this.questModel.countDocuments({ _id: id })
    }

    async editQuest(id, updatedData) {
        let update = await this.questModel.findOneAndUpdate({_id:id},updatedData)
        return update;
    }

    addQuest(data) {
        console.log(data);
       /* let quest = new this.questModel({
            title: data.title,
            description: data.description
        })

        quest.save(function (err, doc) {
            return doc._id
        })*/
    }
    /*
    // Map through all todos, and replace the text of the todo with the specified id




    // Flip the complete boolean on the specified todo
    toggleTodo(id) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? {id: todo.id, text: todo.text, complete: !todo.complete} : todo,
        )
    }
    */
}
module.exports = Quest;