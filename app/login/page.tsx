import React from 'react';
import Image from 'next/image';
import { login, signup } from './actions';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 via-green-400 to-green-500 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl p-6 sm:p-8 w-full max-w-md shadow-lg">
        <div className="text-center mb-6 sm:mb-8">
          <Image src="/kitty2.png" alt="Eco Kitty Logo" width={80} height={80} className="mx-auto animate-bounce" />
          <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mt-4">Welcome to Eco Kitty!</h1>
          <p className="text-sm sm:text-base text-green-600 mt-2">Saving the planet is the purr-fect adventure!</p>
        </div>
        
        <form className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">Email:</label>
            <input 
              className="w-full px-3 py-2 border border-green-400 rounded-md text-green-900 placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-green-700 mb-1">Password:</label>
            <input 
              className="w-full px-3 py-2 border border-green-400 rounded-md text-green-900 placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="Shh... it&apos;s a secret!"
            />
          </div>
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <button 
              formAction={login}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Log in and Save the Planet!
            </button>
            <button 
              formAction={signup}
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Sign up for Eco-tastic Adventures!
            </button>
          </div>
        </form>
        
        <div className="mt-6 sm:mt-8 text-center text-green-700">
          <p className="italic mt-2 text-xs sm:text-sm">&quot;What do you call a cat who recycles? Litter-ally awesome!&quot;</p>
        </div>
      </div>
    </div>
  );
}