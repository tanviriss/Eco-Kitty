import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-400 to-blue-500 min-h-screen text-white">
      <header className="p-4 sm:p-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <Image src="/kitty2.png" alt="Eco Kitty Logo" width={60} height={60} className="animate-bounce" />
            <h1 className="text-3xl sm:text-4xl font-bold">Eco Kitty</h1>
          </div>
          <nav>
            <ul className="flex space-x-4 sm:space-x-6">
              <li><a href="#about" className="text-lg sm:text-xl hover:underline">About</a></li>
              <li><a href="#features" className="text-lg sm:text-xl hover:underline">Features</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <section className="text-center mb-12 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-6 animate-pulse">Paw-some Planet Adventures!</h2>
          <p className="text-2xl sm:text-3xl mb-6 sm:mb-10">Join Eco Kitty on a purr-fectly green journey!</p>
          <div className="relative inline-block">
            <Image 
              src="/kitty2.png" 
              alt="Eco Kitty" 
              width={300} 
              height={300} 
              className="mx-auto transform hover:scale-110 transition duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>
        </section>

        <section id="login-signup" className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 sm:p-10 max-w-2xl mx-auto mb-12 sm:mb-20">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Join the Eco-venture!</h3>
          <div className="space-y-4 sm:space-y-6">
            <Link href="/login" className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full text-center text-xl sm:text-2xl transition duration-300 transform hover:scale-105">
              Login and Save the Planet!
            </Link>
            <Link href="/signup" className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full text-center text-xl sm:text-2xl transition duration-300 transform hover:scale-105">
              Sign Up for Eco Missions!
            </Link>
          </div>
        </section>

        <section id="features" className="mb-12 sm:mb-20 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10">Why Join Eco Kitty?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {[
              { emoji: "🤖", title: "AI Eco-Buddy", description: "Chat with our AI assistant for eco-tips and sustainability advice!" },
              { emoji: "♻️", title: "Recycle Scanner", description: "Scan items to learn if and how they can be recycled in your area!" },
              { emoji: "👣", title: "Carbon Paw-print", description: "Track and reduce your carbon footprint with fun challenges!" }
            ].map((item, index) => (
              <div key={index} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 sm:p-8 transform hover:scale-105 transition duration-300">
                <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">{item.emoji}</div>
                <h4 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{item.title}</h4>
                <p className="text-lg sm:text-xl">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 sm:p-10 mb-12 sm:mb-20">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">About Us</h3>
          <p className="text-lg sm:text-xl leading-relaxed">
            Eco Kitty is more than just an app – it's a movement to empower the next generation of environmental stewards. Born from a passion for sustainability and a love for our feline friends, Eco Kitty combines cutting-edge technology with playful learning experiences. Our mission is to make environmental education fun, interactive, and accessible to children around the world. 
          </p>
          <p className="text-lg sm:text-xl leading-relaxed mt-4 sm:mt-6">
            Through our AI-powered chat, innovative recycling scanner, and engaging carbon footprint tracker, we're helping kids develop eco-friendly habits that will last a lifetime. Join us in our quest to create a greener, cleaner planet – one paw print at a time!
          </p>
        </section>
      </main>

      <footer className="bg-green-800 bg-opacity-50 py-6 sm:py-10 mt-12 sm:mt-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-xl sm:text-2xl">&copy; 2024 Eco Kitty. All rights re-fur-ved! 🐾</p>
        </div>
      </footer>
    </div>
  );
}