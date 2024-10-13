"use client"
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

type Profile = {
  id: string;
  name: string;
  points: number;
};

const Leaderboard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, points')
        .order('points', { ascending: false });
      if (error) {
        console.error('Error fetching profiles:', error);
      } else {
        setProfiles(data || []);
      }
    };

    fetchProfiles();

    // Set up real-time subscription
    const subscription = supabase
      .channel('profiles_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, fetchProfiles)
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getCatImage = (index: number) => `/kitty${index + 1}.png`;

  return (
    <div className="bg-green-100 p-4 rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-800">Leaderboard</h2>
      <div className="space-y-2">
        {profiles.map((profile, index) => (
          <div key={profile.id} className="flex items-center bg-white p-2 rounded-md shadow">
            <div className="w-12 h-12 mr-3 relative">
              {index < 5 ? (
                <Image
                  src={getCatImage(index)}
                  alt={`Cat ${index + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                <div className="w-full h-full" /> // Placeholder for consistent spacing
              )}
            </div>
            <div className="flex-grow">
              <div className="font-semibold">{profile.name}</div>
              <div className="text-sm text-gray-500">{profile.points} points</div>
            </div>
            <div className="text-lg font-bold">#{index + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;