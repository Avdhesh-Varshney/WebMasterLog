const Comment = require('../models/Comment')
const Blog = require('../models/Blog')
const User = require('../models/User')

exports.addComment = async (req, res) => {

    const { blogId, content } = req.body
    const userId = req.user

    if (!blogId || !content) {
        return res.status(400).json({ message: "Please send all the required fields: blogId, content" })
    }

    try {
        const blog = await Blog.findOne({ _id: blogId })
        if (!blog) {
            return res.status(400).json({ message: "Blog not found with id " + blogId })
        }

        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(400).json({ message: "User not found with id " + userId })
        }
        const data = {
            content: content,
            user: userId,
            blog: blogId
        }
        const comment = await Comment.create(data)
        blog.comments.push(comment._id)
        await Blog.updateOne({ _id: blogId }, { $set: blog })
        res.status(201).json({ message: "Comment has been successfully added!" })

    } catch (error) {
        console.log("Failed to add comment: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.deleteComment = async (req, res) => {

    const { id } = req.params
    const userId = req.user

    try {
        const comment = await Comment.findOne({ _id: id })

        if (!comment) {
            return res.status(400).json({ message: "comment not found with id " + id })
        }
        console.log(comment.user, userId)
        if(userId != comment.user) {
            return res.status(401).json({ message: "Unauthorized: Access denied!" })
        }

        const blog = await Blog.findOne({ _id: comment.blog })
        blog.comments.splice(blog.comments.indexOf(comment._id), 1)
        await Blog.updateOne({ _id: blog.id }, { $set: blog })

        await Comment.deleteOne({ _id: comment.id })
        res.status(201).json({ message: "Comment has been successfully deleted!" })

    } catch (error) {
        console.log("Failed to delete comment: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.updateComment = async (req, res) => {
    const { id } = req.params
    const userId = req.user

    const {content} = req.body;

    if(!content) {
        return res.status(400).json({ message: "content is required!"})
    }

    try {
        const comment = await Comment.findOne({ _id: id })

        if (!comment) {
            return res.status(400).json({ message: "comment not found with id " + id })
        }
        

        if (comment.user != userId) {
            return res.status(400).json({ message: "Unauthorized: Access denied!"})
        }

        await Comment.updateOne({ _id: id }, { $set: req.body })
        res.status(200).json({ message: "Comment has been successfully updated!" })

    } catch (error) {
        console.log("Failed to update comment: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.getCommentsByBlog = async (req, res) => {
    const { commentId, blogId } = req.query

    try {
        let data = []

        if (commentId) {
            data = await Comment.findOne({ _id: commentId }).populate({
                path: 'user',
                select: 'fname lname email'
            })
        } else if (blogId) {
            data = await Comment.find({ blog: blogId }).populate({
                path: 'user',
                select: 'fname lname email'
            })
        }
        res.status(200).json(data)

    } catch (error) {
        console.log("Failed to find comments: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

