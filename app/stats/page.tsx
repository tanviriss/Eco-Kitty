'use client';

import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import Link from "next/link";

function NavButton({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link href={href}>
      <button
        className={`px-4 sm:px-6 py-3 rounded-full flex items-center text-base sm:text-lg font-bold bg-gray-200 hover:bg-gray-300 transition-colors`}
      >
        <i className={`bx ${icon} mr-2 bx-sm`}></i>
        {label}
      </button>
    </Link>
  );
}

const Stats = () => {
  const [showQuests, setShowQuests] = useState(false);
  const [quests, setQuests] = useState([
    { id: 1, text: "Go the whole day with no trash - recycle!", completed: false },
    { id: 2, text: "Avoid plastic", completed: false },
    { id: 3, text: "Energy free hour - no electricity", completed: false }
  ]);

  const toggleQuest = (id: number) => {
    setQuests(quests.map(quest => 
      quest.id === id ? { ...quest, completed: !quest.completed } : quest
    ));
  };

  return (
    <div className="antialiased bg-white min-h-screen relative">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex flex-col items-center justify-between mb-6 relative">
          <div className="flex flex-row items-center mb-4">
            <img
              className="w-20 h-20 sm:w-24 sm:h-24"
              src="/kitty2.png"
              alt="Eco Kitty Logo"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-green-600 ml-4">Eco Kitty</h1>
          </div>
          <p className="text-green-600 italic text-lg">purrfect for the planet</p>
        </div>
        
        <main className="bg-green-100 rounded-lg p-4 border-2">
          <nav className="flex flex-wrap justify-center sm:justify-between gap-4 mb-4 w-full">
            <NavButton href="/stats" icon="bx-bar-chart" label="stats" />
            <NavButton href="/chat" icon="bx-chat" label="chat" />
            <NavButton href="/scan" icon="bx-qr-scan" label="scan" />
          </nav>
          {/* put component here */}
        </main>
      </div>

      {/* Quests Button */}
      <button 
        className="fixed bottom-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-50"
        onClick={() => setShowQuests(!showQuests)}
      >
        <i className="bx bx-list-ul text-3xl sm:text-4xl"></i>
      </button>

      {/* Quests Popup */}
      {showQuests && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 max-w-2xl h-5/6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-green-700">Today's Quests</h2>
              <button onClick={() => setShowQuests(false)} className="text-gray-500 hover:text-gray-700">
                <i className="bx bx-x text-4xl"></i>
              </button>
            </div>
            <ul className="space-y-6 overflow-y-auto flex-grow">
              {quests.map((quest) => (
                <li key={quest.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={quest.completed}
                    onChange={() => toggleQuest(quest.id)}
                    className="form-checkbox h-8 w-8 text-green-600 rounded-md border-2 border-green-300 focus:ring-green-500"
                  />
                  <span className={`ml-4 text-xl ${quest.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {quest.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;