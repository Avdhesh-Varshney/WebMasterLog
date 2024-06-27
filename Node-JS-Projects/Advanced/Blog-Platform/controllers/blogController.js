const Blog = require('../models/Blog')
const User = require('../models/User')
const Tag = require('../models/Tag')
const Comment = require('../models/Comment')

exports.createBlog = async (req, res) => {

    const { title, content, tagIds } = req.body
    const userId = req.user

    try {
        if (!title || !content || !tagIds || tagIds.length === 0) {
            return res.status(400).json({ message: "Please send all the required fields: title, content, TagIds" })
        }

        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(400).json({ message: "User not found with id " + userId })
        }

        if (tagIds.length > 5) {
            return res.status(400).json({ message: "One post connot have more than 5 tags." })
        }

        const tags = await Tag.find({ _id: { $in: tagIds } })
        const validTagIds = tags.map(tag => tag._id.toString())
        const invalidTagIds = tagIds.filter(id => !validTagIds.includes(id))
        if (invalidTagIds.length !== 0) {
            return res.status(400).json({ message: "Tags not found with id " + invalidTagIds })
        }

        const data = {
            title: title,
            content: content,
            user: userId,
            tags: tagIds,
            likes: [], comments: []
        }


        await Blog.create(data)

        res.status(201).json({ message: "Blog has been successfully published!" })

    } catch (error) {
        console.log("Failed to add blog: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.updateBlog = async (req, res) => {
    const { title, content, tagIds } = req.body
    const { id } = req.params
    const userId = req.user

    try {
        if (!id || !title || !content || !tagIds || tagIds.length === 0) {
            return res.status(400).json({ message: "Please send all the required fields: title, content, TagIds" })
        }

        const blog = await Blog.findOne({ _id: id })
        if (!blog) {
            return res.status(400).json({ message: "Blog not found with id " + id })
        }

        if(userId != blog.user) {
            return res.status(401).json({ message: "Unauthorized: Access denied!" })
        }

        if (tagIds.length > 5) {
            return res.status(400).json({ message: "One post connot have more than 5 tags." })
        }

        const tags = await Tag.find({ _id: { $in: tagIds } })
        const validTagIds = tags.map(tag => tag._id.toString())
        const invalidTagIds = tagIds.filter(id => !validTagIds.includes(id))
        if (invalidTagIds.length !== 0) {
            return res.status(400).json({ message: "Tags not found with id " + invalidTagIds })
        }

        const data = {
            title: title,
            content: content,
            user: blog.userId,
            tags: tagIds,
            likes: blog.likes,
            comments: blog.comments
        }


        await Blog.updateOne({ _id: id }, { $set: data })
        res.status(201).json({ message: "Blog has been successfully Updated!" })

    } catch (error) {
        console.log("Failed to add blog: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.getBlogs = async (req, res) => {
    const {blogId, userId, tagId} = req.query

    try {
        let data = []

        if (blogId) {
            data = await Blog.findOne( { _id: blogId } ).populate('tags')
        }
        else if (userId) {
            data = await Blog.find( { user: userId } ).populate('tags')
        }
        else if (tagId) {
            data = await Blog.find( { tags: tagId } ).populate('tags')
        }
        else {
            data = await Blog.find().populate('tags')
        }
        res.status(200).json(data)
    } catch (error) {
        console.log("Failed to find blogs: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.deleteBlog = async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findOne({ _id: id })

        if (!blog) {
            return res.status(404).json({ message: "Blog not found with id " + id })
        }

        if (req.user != blog.user) {
            return res.status(401).json({ message: "Unauthorized: Access denied!" })
        }

        await Blog.deleteOne({_id: id})
        await Comment.deleteMany({blog: id})
        
        res.status(200).json({ message: "Blog has been successfully deleted!" })

    }catch (error) {
        console.log("Failed to delete blog: " + error)
    }   
}