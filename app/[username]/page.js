import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDB from '@/db/connectDb'
import User from '@/models/User'
import dynamic from 'next/dynamic'

// Return a list of `params` to populate the [slug] dynamic segment
export async function getStaticPaths() {
    await connectDB();
    const users = await User.find({}).select('username -_id');

    const paths = users.map(user=>({
        params: {username: user.username},
    }));
    return {
        paths,
        fallback: true,
    }
}

const PaymentPageWithNoSSR = dynamic(()=> import('@/components/PaymentPage'), {
    ssr: false,
})

const Username = async ({params}) => {
    // await connectDB();
    // let u = await User.findOne({username: params.username});
    // if(!u){
    //     return notFound();
    // }
    // else {

        return (
            <>
                <PaymentPageWithNoSSR username={params.username} />
            </>
        )
    // }
}

export default Username

export async function generateMetadata({params}) {
    return {
        title: `Support ${params.username}`,
        description: 'Payment page',
    }
}
