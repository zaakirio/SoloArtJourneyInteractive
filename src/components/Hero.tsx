import React from 'react';
export const Hero: React.FC = () => {
    return (<div className="hero-bg h-96 flex items-center justify-center bg-black bg-opacity-50">
        <svg
            className="w-full h-48"
            viewBox="0 0 800 200"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-6xl font-bold stroke-current text-white fill-none stroke-[8]"
                strokeLinecap="round"
                strokeLinejoin="round"
                letterSpacing="10"
            >
                Solo Art Journey
            </text>
        </svg>
    </div>)
}