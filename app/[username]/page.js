import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDB from '@/db/connectDb'
import User from '@/models/User'
import dynamic from 'next/dynamic'

const UsernamePage = async ({params}) => {
    await connectDB();
    let u = await User.findOne({username: params.username});
    if(!u){
        return notFound();
    }
    else {

        return (
            <>
                <PaymentPage username={params.username} />
            </>
        )
    }
}

export default UsernamePage

export async function generateMetadata({params}) {
    return {
        title: `Support ${params.username}`,
        description: 'Payment page',
    }
}
