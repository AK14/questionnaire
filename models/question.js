import mongoose from 'mongoose';
import QuestModel from "./quest.js";
const Schema = mongoose.Schema;

// create mongoose schema
const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    quest: {
        type:Schema.Types.ObjectId,
        ref: 'QuestModel'
    },
    answers: {
        type:Array
    }
});
// create mongoose db model
const QuestionModel = mongoose.model('Question', questionSchema);

export default QuestionModel