import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: {
        type:  String,
        required: true,
        unique: true,
    },
    desc: {
        type : String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    category:{
        type: String,
        enum: ["java", "javScript", "web", "General"],
        default: "General"
    }
    
},
{
    timestamps: true,
}
);

const Article = mongoose.model("article", ArticleSchema);

export default Article;