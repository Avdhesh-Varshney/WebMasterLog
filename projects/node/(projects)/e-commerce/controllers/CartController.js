const User = require('../models/User');
const Product = require('../models/Product');

exports.addItem = async (req, res) => {
    try {
        const userId = req.user;
        const { productId, quantity } = req.body;

        const user = await User.findById(userId);

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ success: false, message: "Product not found with id " + id })
        }

        const cartItem = user.cart.cartItems.find(item => item.productId.toString() === productId.toString());
        if (cartItem) {
            return res.status(200).json({ success: false, message: 'Item already in the cart!', cart: user.cart });
        } else {
            user.cart.cartItems.push({ productId: productId, price: quantity * product.price, quantity: quantity });
        }

        user.cart.numberOfItems += quantity;
        user.cart.total += (quantity * product.price);

        await User.updateOne({ _id: user._id }, { $set: user })

        return res.status(200).json({ success: true, message: 'Item added to cart', cart: user.cart });

    } catch (error) {
        console.log("Failed to add/remove item to wishlist: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
};

exports.updateQuantity = async (req, res) => {
    try {
        const userId = req.user;
        const { productId, quantity } = req.body;

        const user = await User.findById(userId);

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ success: false, message: "Product not found with id " + id })
        }

        const cartItem = user.cart.cartItems.find(item => item.productId.toString() === productId.toString());
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        const difference = quantity - cartItem.quantity;
        cartItem.quantity = quantity;
        cartItem.price = cartItem.quantity * product.price
        user.cart.numberOfItems += difference;
        user.cart.total += (difference * product.price);

        await User.updateOne({ _id: user._id }, { $set: user })

        return res.status(200).json({ success: true, message: 'Cart item quantity updated', cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

exports.removeItem = async (req, res) => {
    try {
        const userId = req.user; 
        const { productId } = req.params;

        const user = await User.findById(userId);

        const cartItemIndex = user.cart.cartItems.findIndex(item => item.productId.toString() === productId.toString());
        if (cartItemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        const cartItem = user.cart.cartItems[cartItemIndex];
        user.cart.numberOfItems -= cartItem.quantity;
        user.cart.total -= (cartItem.quantity * (await Product.findById(productId)).price);
        if(user.cart.total < 0) user.cart.total = 0
        user.cart.cartItems.splice(cartItemIndex, 1);

        await User.updateOne({ _id: user._id }, { $set: user })

        return res.status(200).json({ success: true, message: 'Item removed from cart', cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.user; 

        const user = await User.findById(userId);

        user.cart.cartItems = [];
        user.cart.numberOfItems = 0;
        user.cart.total = 0;

        await User.updateOne({ _id: user._id }, { $set: user })

        return res.status(200).json({ success: true, message: 'Cart cleared', cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

exports.getCartByUser = async (req, res) => {
    try {
        const userId = req.user; 

        const user = await User.findById(userId);

        return res.status(200).json({ success: true, message: `${user.cart.cartItems.length} items in the cart!`, cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};
