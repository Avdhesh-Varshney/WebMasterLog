exports.validateRegister = () => {
    return async (req, res, next) => {

        const {username, email, password, roles} = req.body;
        const errors = {}
    
        if (username.trim() === "") {
            errors.username = "Username is required!"
        }else if(username.trim().length <= 3) {
            errors.username = "Username must have atleast 4 characters!"
        }
    
        if (email.trim() === "") {
            errors.email = "Email is required!"
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            errors.email = "Invalid email address!"
        }
    
        if (password.trim() === "") {
            errors.password = "Password is required!"
        }else if(password.trim().length < 8) {
            errors.password = "Password must have atleast 8 characters!"
        }
    
        if (!roles) {
            console.log(roles)
            req.body.roles = ['user']
        }
        else if (!Array.isArray(roles)) {
            errors.role = "Roles should be an array!"
        }
    
        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({success: false, response: errors})
        }
    
        next()
    }
}

exports.validateLogin = () => {
    return (req, res, next) => {

        const {email, password} = req.body;
        const errors = {}
    
        if (email.trim() === "") {
            errors.email = "Email is required!"
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            errors.email = "Invalid email address!"
        }

        if (password.trim() === "") {
            errors.password = "Password is required!"
        }
    
        if (Object.keys(errors).length !== 0) {
            return res.status(400).json({success: false, response: errors})
        }
    
        next()
    }
}