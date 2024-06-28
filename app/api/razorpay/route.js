import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const POST = async(req)=>{
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);

    // Check if the razorpayOrderId is present on the server
    let p = await Payment.findOne({order_id: body.razorpay_order_id});
    // console.log('Searching for payment with the order_id:', body.razorpay_order_id);
    // console.log('Payment found:',p);
    if(!p){
        return NextResponse.json({success: false, message:"Order Id not found"})
    }

    let user = await User.findOne({username: p.to_user});
    const secret = user.razorpay_secret;

    // Verify the payment
    let vp = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret);

    if(vp){
        // Update the payment status in the database
        const updatedPayment = await Payment.findOneAndUpdate({order_id: body.razorpay_order_id}, {status: 'success'}, {new: true});
        return NextResponse.redirect(`https://patreon-clone-j4dekxnnd-manishjangiriitgs-projects.vercel.app/${updatedPayment.to_user}?paymentdone=true`);
    }

    else {
        return NextResponse.error("Payment Verification Failed!")
    }

}