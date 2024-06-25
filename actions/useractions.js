"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"
import dotenv from 'dotenv';

dotenv.config();

export const initiate = async (amount, to_user, paymentform) => {
    await connectDB();
    let user = await User.findOne({username: to_user});
    const secret = user.razorpay_secret;
    const ra_id = user.razorpay_secret;
    let instance = new Razorpay({ key_id: ra_id, key_secret: secret})

    // await instance.orders.create({
    //     amount: 50000,
    //     currency: "INR",
    //     receipt: "receipt#1",
    //     notes: {
    //         key1: "value3",
    //         key2: "value2"
    //     }
    // })

    if (!instance) {
        console.error('instance is not defined');
    }

    if (!instance.orders) {
        console.error('instance.orders is not defined')
    }


    // let options = {
    //     amount: Number.parseInt(amount),
    //     currency: "INR",
    // }

    // let x;
    // try {
    //     console.log('Creating order with amount:', amount);
    //     x = await instance.orders.create({
    //         amount: Number.parseInt(amount),
    //         currency: "INR",
    //         receipt: "receipt#1",
    //         notes: {
    //             key1: "value3",
    //             key2: "value2"
    //         }
    //    })
    // } catch (error) {
    //     console.error('Error creating order:', error);
    //     // console.error('Instance:', instance);
    //     // console.error('Orders:',instance?.orders);
    // }

    // console.log('Creating order with amount:', amount);

    // let x = instance.orders.create({
    //     amount: Number.parseInt(amount),
    //     currency: "INR",
    //     receipt: "receipt#1",
    //     notes: {
    //         key1: "value3",
    //         key2: "value2"
    //     }
    // })

    let orderOptions = {
        amount: Number.parseInt(amount)*100,
        currency: "INR",
        receipt: "receipt#1",
        notes:{
            key1: "value3",
            key2: "value2"
        }
    };

    let order = await instance.orders.create(orderOptions);

    
    if(!order){
        // console.log(x);
        // console.error('Amount:', amount);
        // console.error('Instance:', instance);
        throw Error('Error creating order');
    }
    
    // console.log('Order created:', order);
    

    // Create a payment object which shows a pending payment in the database
    try{

        const newPayment = new Payment({ 
            key: order.id,
            amount: amount, 
            to_user: to_user, 
            name: paymentform.name, 
            message: paymentform.message, 
            order_id: order.id 
        });
        await newPayment.save();
        // console.log('Payment saved:',newPayment);
        // let vawa = Payment.findOne({key: x.id})
        // console.log(vawa);
    } catch (error){
        console.error('Failed to save Payment:',error);
    }


    return order;
}

export const fetchuser = async (username) => {
    await connectDB();
    let u = await User.findOne({username: username});
    let user = u.toObject({flattenObjectIds: true});
    return user;
}

export const fetchpayments = async (username) => {
    await connectDB();
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({to_user: username, status:"success"}).sort({amount: -1}).limit(10).lean();
    return p;
}

export const updateProfile = async (data, oldusername) => {
    await connectDB();
    let ndata = Object.fromEntries(data);

    // If the username is being updated, check if username is available
    if(oldusername !== ndata.username){
       let u = await User.findOne({username: ndata.username});
       if(u){
            return {error: 'Username already exists'};
       }
       await User.updateOne({email: ndata.email}, ndata)
       await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
    }
    else{
        await User.updateOne({email: ndata.email}, ndata);
    }

}