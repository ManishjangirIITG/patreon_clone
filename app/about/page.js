import React from 'react';

export const metadata ={
    title: 'About Get Me a Coffee',
    description: 'About Get Me a Coffee, a crowdfunding platform for creators and fans.',
}

const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-4">About Get Me a Coffee</h1>
            <p className="text-lg text-gray-400">
                Get Me a Coffee is a crowdfunding platform that empowers creators to monetize their passion and talent by connecting directly with their fans. Our platform enables fans to support their favorite creators through one-time donations or recurring contributions, fostering a sustainable ecosystem for creative content.
            </p>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Key Features:</h2>
                <ul className="list-disc list-inside text-lg text-gray-400">
                    <li>Direct connection between creators and fans.</li>
                    <li>One-time donations and recurring contributions.</li>
                    <li>Exclusive access to premium content for fans.</li>
                    <li>Personalized interactions with creators.</li>
                </ul>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Unique Selling Points:</h2>
                <ul className="list-disc list-inside text-lg text-gray-400">
                    <li>Empowering creators to showcase their work.</li>
                    <li>Engaging fans in the creative process.</li>
                    <li>Driving innovation within the artistic community.</li>
                    <li>Building a vibrant and supportive creator-fan community.</li>
                </ul>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">How It Works:</h2>
                <p className="text-lg text-gray-400 mt-2">
                    Creators can set up profiles, showcase their work, and receive donations from fans. Fans can explore creators, make contributions, and engage with exclusive content and interactions.
                </p>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Benefits of Collaboration:</h2>
                <ul className="list-disc list-inside text-lg text-gray-400">
                    <li>Creators gain financial support to fuel their creativity.</li>
                    <li>Fans get access to unique content and personalized experiences.</li>
                    <li>Collaboration fosters a sense of community and mutual appreciation.</li>
                </ul>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Community Engagement:</h2>
                <p className="text-lg text-gray-400 mt-2">
                    Get Me a Coffee encourages creators and fans to interact, share feedback, and participate in a vibrant community. By engaging with each other, both creators and fans contribute to a supportive and inspiring environment for creative endeavors.
                </p>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">Join Our Community</h2>
                <p className="text-lg text-gray-400 mt-2">
                    Whether you are an aspiring creator looking to showcase your talent or a fan eager to support the arts, Get Me a Coffee welcomes you to join our vibrant community. Together, we can empower creators, engage fans, and drive innovation in the world of content creation.
                </p>
            </div>
        </div>
    );
}

export default About;