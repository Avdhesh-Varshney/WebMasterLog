const User = require('../models/User');
const Order = require('../models/Order');
const { default: mongoose } = require('mongoose');

exports.createOrder = async (req, res) => {

    try {
        const userId = req.user;
        const { shipAddress1, shipAddress2, shipToCity, phone } = req.body;

        const user = await User.findById(userId);
        const cart = user.cart

        if (user.cart.cartItems.length === 0) {
            res.status(404).json({ success: false, message: "No items in the cart!" })
        }

        const orderItems = cart.cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.quantity * item.price
        }));

        const total = orderItems.reduce((sum, item) => sum + item.price, 0);

        const newOrder = new Order({
            userId,
            items: orderItems,
            total,
            status: 'Pending',
            shipAddress1,
            shipAddress2,
            shipToCity,
            phone
        });

        await Order.create(newOrder);
        user.cart.cartItems = [];
        user.cart.numberOfItems = 0;
        user.cart.total = 0;

        await User.updateOne({ _id: user._id }, { $set: user })

        res.status(201).json({ success: true, message: "New order has been successfully created!" })

    } catch (error) {
        console.log("Failed to create order: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }

};

exports.updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!['Pending', 'Processed', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        order.updatedAt = Date.now();

        await Order.updateOne({ _id: orderId }, { $set: order })

        return res.status(200).json({ success: true, message: 'Order status updated', order: order });
    } catch (error) {
        console.log("Failed to update order status: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        return res.status(200).json({ success: true, message: `${orders.length} orders found!`, orders });
    } catch (error) {
        console.log("Failed to fetch all orders: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.getOrderByUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success:false, message: `Order id ${id} is invalid!` })
        }

        const orders = await Order.find({ userId: id })

        return res.status(200).json({ success: true, message: `${orders.length} orders found!`, orders });
    } catch (error) {
        console.log("Failed to fetch orders by user: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.getOrderByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const orders = await Order.find({ status: status })

        return res.status(200).json({ success: true, message: `${orders.length} orders found!`, orders });
    } catch (error) {
        console.log("Failed to fetch orders by user: " + error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.getOrderById = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success:false, message: `Order id ${id} is invalid!` })
        }

        const order = await Order.findOne({ _id: id })
        if (!order) {
            return res.status(400).json({ success:false, message: "Order not found with id " + id })
        }

        res.status(200).json({ success: true, order: order })
        
    }catch (error) {
        console.log("Failed to find order: " + error)
        return res.status(500).json({ success:false, message: "Internal server error" })
    }
}
