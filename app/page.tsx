import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-300 via-green-400 to-green-500 min-h-screen text-green-900">
      <header className="bg-green-200 p-4 sm:p-6 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <Image src="/kitty2.png" alt="Eco Kitty Logo" width={80} height={80} className="animate-bounce" />
            <h1 className="text-4xl sm:text-5xl font-bold text-green-800">Eco Kitty</h1>
          </div>
          <nav>
            <ul className="flex space-x-6 sm:space-x-8">
              <li><a href="#about" className="text-xl sm:text-2xl font-semibold hover:text-green-600 transition-colors">About</a></li>
              <li><a href="#features" className="text-xl sm:text-2xl font-semibold hover:text-green-600 transition-colors">Features</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <section className="text-center mb-16 sm:mb-24">
          <h2 className="text-5xl sm:text-7xl font-bold mb-6 sm:mb-8 text-green-900 animate-pulse">Paw-some Planet Adventures!</h2>
          <p className="text-3xl sm:text-4xl mb-8 sm:mb-12 text-green-800">Join Eco Kitty on a purr-fectly green journey!</p>
          <div className="relative inline-block">
            <Image 
              src="/kitty2.png" 
              alt="Eco Kitty" 
              width={400} 
              height={400} 
              className="mx-auto transform hover:scale-110 transition duration-300"
            />
          </div>
        </section>

        <section id="login-signup" className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-xl p-8 sm:p-12 max-w-3xl mx-auto mb-16 sm:mb-24 shadow-lg">
          <h3 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-10 text-center text-green-900">Join the Eco-venture!</h3>
          <div className="space-y-6 sm:space-y-8">
            <Link href="/login" className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-full text-center text-2xl sm:text-3xl transition duration-300 transform hover:scale-105 shadow-md">
              Login and Save the Planet!
            </Link>
            <Link href="/login" className="block w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-full text-center text-2xl sm:text-3xl transition duration-300 transform hover:scale-105 shadow-md">
              Sign Up for Eco Missions!
            </Link>
          </div>
        </section>

        <section id="features" className="mb-16 sm:mb-24 text-center">
          <h3 className="text-4xl sm:text-5xl font-bold mb-10 sm:mb-12 text-green-900">Why Join Eco Kitty?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {[
              { emoji: "🤖", title: "AI Eco-Buddy", description: "Chat with our AI assistant for eco-tips and sustainability advice!" },
              { emoji: "♻️", title: "Recycle Scanner", description: "Scan items to learn if and how they can be recycled in your area!" },
              { emoji: "👣", title: "Carbon Paw-print", description: "Track and reduce your carbon footprint with fun challenges!" }
            ].map((item, index) => (
              <div key={index} className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl p-8 sm:p-10 transform hover:scale-105 transition duration-300 shadow-lg">
                <div className="text-7xl sm:text-8xl mb-6">{item.emoji}</div>
                <h4 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-green-800">{item.title}</h4>
                <p className="text-xl sm:text-2xl text-green-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl p-8 sm:p-12 mb-16 sm:mb-24 shadow-lg">
          <h3 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-10 text-center text-green-900">About Us</h3>
          <p className="text-xl sm:text-2xl leading-relaxed text-green-800 mb-6">
            Eco Kitty is more than just an app – it's a movement to empower the next generation of environmental stewards. Born from a passion for sustainability and a love for our feline friends, Eco Kitty combines cutting-edge technology with playful learning experiences. Our mission is to make environmental education fun, interactive, and accessible to children around the world. 
          </p>
          <p className="text-xl sm:text-2xl leading-relaxed text-green-800">
            Through our AI-powered chat, innovative recycling scanner, and engaging carbon footprint tracker, we're helping kids develop eco-friendly habits that will last a lifetime. Join us in our quest to create a greener, cleaner planet – one paw print at a time!
          </p>
        </section>
      </main>

      <footer className="bg-green-700 py-8 sm:py-10 mt-16 sm:mt-24 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-2xl sm:text-3xl">&copy; 2024 Eco Kitty. All rights re-fur-ved! 🐾</p>
        </div>
      </footer>
    </div>
  );
}