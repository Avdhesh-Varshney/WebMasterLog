const Blog = require('../models/Blog')
const User = require('../models/User')


exports.likeOrUnLike = async (req, res) => {
    const { blogId } = req.body
    const userId = req.user

    if (!blogId) {
        return res.status(400).json({ message: "Please send all the required fields: blogId" })
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

        if (blog.likes.includes(userId)) {
            blog.likes.splice(blog.likes.indexOf(userId), 1)
            await Blog.updateOne({ _id: blogId }, { $set: blog })
            res.status(200).json({ message: "Like has been removed from the blog!" })
        } else {
            blog.likes.push(userId)
            await Blog.updateOne({ _id: blogId }, { $set: blog })
            res.status(200).json({ message: "Like has been added to the blog!" })
        }
    } catch (error) {
        console.log("Failed to like/unlike blog: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

}

exports.getLikesByBlog = async (req, res) => {
    const { blogId }  = req.params

    try {
        const blog = await Blog.findOne({ _id: blogId }).populate({
            path: 'likes',
            select: 'fname lname email'
        })
        if (!blog) {
            return res.status(400).json({ message: "Blog not found with id " + blogId })
        }

        res.status(200).json(blog.likes)
    }catch (error) {
        console.log("Failed to find likes of the blog: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}