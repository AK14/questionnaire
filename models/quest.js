import mongoose from 'mongoose';
import QuestionModel from "../models/question.js";
const Schema = mongoose.Schema;

const questSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    questions:{
        type:Schema.Types.ObjectId,
        ref: "QuestionModel"
    }
});
// create mongoose db model
const QuestModel = mongoose.model('Quest', questSchema);
export default QuestModel;