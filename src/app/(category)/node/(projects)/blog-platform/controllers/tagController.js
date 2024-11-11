const Tag = require('../models/Tag')

exports.getTags = async (req, res) => {
    const id = req.query.id
    const key = req.query.key
    let tagData = [];
    try {
        if (id) {
            tagData = await Tag.findOne({_id: id})
        }else if (key) {
            const regex = new RegExp('^' + key, 'i')
            tagData = await Tag.find( { tagName: regex } )
        }else {
            tagData = await Tag.find()
        }

        if (tagData.length === 0) {
            return res.status(404).json({ message: "No tags found!" })
        }


        res.status(200).json(tagData)
    } catch (error) {
        console.log("Failed to tags: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
    
}

exports.createTag = async (req, res) => {
    const { name } = req.body
    
    {
        try {
            if (!name) {
                return res.status(400).json({message: 'Tag name is required!'})
            }

            await Tag.create({tagName: name})

            res.status(201).json({message: 'Tag has been successfully created!'})
            
        } catch (error) {
            console.log("Failed to create tag: " + error)
            return res.status(500).json({ message: "Internal server error" })
        }
    }

}

exports.updateTag = async (req, res) => {
    const id = req.params
    const { name } = req.body
    
    {
        try {
            if (!name) {
                return res.status(400).json({message: 'Tag name is required!'})
            }

            const tag = Tag.findOne({_id: id})

            if (!tag) {
                return res.status(400).json({message: 'Tag is found with id ' + id})
            }

            await Tag.updateOne({ _id: id }, { $set: {tagName: name} })

            res.status(200).json({message: 'Tag has been successfully updated!'})
            
        } catch (error) {
            console.log("Failed to update tag: " + error)
            return res.status(500).json({ message: "Internal server error" })
        }
    }
    
}

exports.deleteTag = async (req, res) => {
    const id = req.params
    
    {
        try {
            const tag = Tag.findOne({_id: id})

            if (!tag) {
                return res.status(400).json({message: 'Tag is found with id ' + id})
            }

            await Tag.deleteOne({ _id: id })

            res.status(201).json({message: 'Tag has been successfully deleted!'})
            
        } catch (error) {
            console.log("Failed to delete tag: " + error)
            return res.status(500).json({ message: "Internal server error" })
        }
    }
    
}