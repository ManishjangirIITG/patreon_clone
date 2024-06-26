import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDB from '@/db/connectDb'
import User from '@/models/User'

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json())
   
//     return posts.map((post) => ({
//       slug: post.slug,
//     }))
// }

const Username = async ({params}) => {
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

export default Username

export async function generateMetadata({params}) {
    return {
        title: `Support ${params.username}`,
        description: 'Payment page',
    }
}
