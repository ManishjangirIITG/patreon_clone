import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose';
import User from '@/models/User';
import Payment from '@/models/Payment';
import connectDB from '@/db/connectDb';

export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            profile(profile){
                // console.log(profile);
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email
                }
            }
        }),
        //     AppleProvider({
        //         clientId: process.env.APPLE_ID,
        //         clientSecret: process.env.APPLE_SECRET
        //     }),
        //     FacebookProvider({
        //         clientId: process.env.FACEBOOK_ID,
        //         clientSecret: process.env.FACEBOOK_SECRET
        //     }),
        //     GoogleProvider({
        //         clientId: process.env.GOOGLE_ID,
        //         clientSecret: process.env.GOOGLE_SECRET
        //     }),
        //     // Passwordless / email sign in
        //     EmailProvider({
        //         server: process.env.MAIL_SERVER,
        //         from: 'NextAuth.js <no-reply@example.com>'
        //     }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            
            if(account.provider == 'github'){
                await connectDB();
                // Check if the user already exists in the database
                const currentUser = await User.findOne({email: user.email})
                // if(!email){
                //     console.error('No email found for Github account.');
                //     return false;
                // }
                if(!currentUser){
                    // Create a new user
                    const newUser = await User.create({
                        email: user.email,
                        // name: profile.name,
                        username: user.email.split('@')[0],
                        // razorpay_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        // razorpay_secret: process.env.RAZORPAY_KEY_SECRET
                        // profilepic: profile.avatar_url,
                    })
                    // user.name = newUser.username
                    // console.log(newUser);
                }
                // else{
                //     user.name = currentUser.username
                // }
                return true;
            }
        },
        async session({ session, user, token}){
            const dbUser = await User.findOne({ email: session.user.email });
            // console.log(dbUser);
            session.user.name = dbUser.username
            return session
        },
    },
    //     async session({ session, token, user }) {
    //         const dbUser = await User.findOne({ email: session.user.email })
    //         session.user.name = dbUser.username
    //         return session
    //     },
    // }
});

export { authoptions as GET, authoptions as POST }