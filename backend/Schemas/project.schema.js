import { Schema } from "mongoose";

const projectSchema = Schema(
    {
        project_id: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        banner: {
            type: String,
            default: "https://res.cloudinary.com/avdhesh-varshney/image/upload/v1741270498/project_banner_wpphwm.png",
        },
        des: {
            type: String,
            maxlength: 200,
            default: "",
        },
        projectUrl: {
            type: String,
            default: "",
        },
        repository: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: [],
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        },
        activity: {
            total_likes: {
                type: Number,
                default: 0
            },
            total_comments: {
                type: Number,
                default: 0
            },
            total_reads: {
                type: Number,
                default: 0
            },
            total_parent_comments: {
                type: Number,
                default: 0
            },
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'comments'
        },
        draft: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: {
            createdAt: 'publishedAt'
        }

    }
)

export default projectSchema;
