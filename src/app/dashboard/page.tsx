'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import OnboardingModal from '@/components/OnboardingModal';
import Image from 'next/image';
import Link from 'next/link';

interface SolvedBounty {
  id: number;
  title: string;
  repo: string;
  reward: string;
  solvedDate: string;
}

interface Developer {
  id: number;
  name: string;
  avatar: string;
  reputation: number;
  bountiesSolved: number;
  status: 'online' | 'offline';
}

interface SuggestedDev {
  id: number;
  name: string;
  avatar: string;
  expertise: string[];
  matchRate: number;
}

interface UserStats {
  bountiesFixed: number;
  totalEarned: number;
  reputation: number;
}

export default function Dashboard() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    bountiesFixed: 0,
    totalEarned: 0,
    reputation: 0
  });

  const solvedBounties: SolvedBounty[] = [
    {
      id: 1,
      title: "Fixed Memory Leak in Auth Module",
      repo: "org/auth-service",
      reward: "0.5 ETH",
      solvedDate: "2024-02-28"
    },
    {
      id: 2,
      title: "Patched SQL Injection Vulnerability",
      repo: "org/data-layer",
      reward: "0.8 ETH",
      solvedDate: "2024-02-25"
    }
  ];

  const activeDevelopers: Developer[] = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "/default-avatar.png",
      reputation: 4.8,
      bountiesSolved: 12,
      status: 'online'
    },
    {
      id: 2,
      name: "Sarah Kim",
      avatar: "/default-avatar.png",
      reputation: 4.5,
      bountiesSolved: 8,
      status: 'online'
    }
  ];

  const suggestedDevs: SuggestedDev[] = [
    {
      id: 1,
      name: "Mike Johnson",
      avatar: "/default-avatar.png",
      expertise: ["Smart Contracts", "Solidity"],
      matchRate: 95
    },
    {
      id: 2,
      name: "Emma Davis",
      avatar: "/default-avatar.png",
      expertise: ["Frontend", "React"],
      matchRate: 88
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!address) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/dashboard?wallet=${address}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Debug log
        
        if (data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Dashboard Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-[#8b949e] mt-1">Overview of your activity and earnings</p>
      </div>

      {/* Stats Section */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bounties Fixed */}
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="flex flex-col">
              <span className="text-[#8b949e] mb-2">Bounties Fixed</span>
              <span className="text-2xl font-bold text-[#238636]">
                {stats.bountiesFixed}
              </span>
              <div className="mt-2 h-2 bg-[#161b22] rounded-full">
                <div 
                  className="h-full bg-[#238636] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats.bountiesFixed / 20) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Total Earned */}
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="flex flex-col">
              <span className="text-[#8b949e] mb-2">Total Earned</span>
              <span className="text-2xl font-bold text-[#238636]">
                {`${stats.totalEarned} ETH`}
              </span>
              <div className="mt-2 h-2 bg-[#161b22] rounded-full">
                <div 
                  className="h-full bg-[#238636] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats.totalEarned / 5) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Reputation */}
          <div className="bg-[#0d1117] rounded-lg p-4">
            <div className="flex flex-col">
              <span className="text-[#8b949e] mb-2">Reputation</span>
              <span className="text-2xl font-bold text-[#238636]">
                {`Level ${stats.reputation}`}
              </span>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      index < stats.reputation ? 'bg-[#238636]' : 'bg-[#161b22]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solved Bounties Section */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Recently Solved Bounties</h2>
            <div className="space-y-4">
              {solvedBounties.map(bounty => (
                <div key={bounty.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">{bounty.title}</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8b949e]">{bounty.repo}</span>
                    <span className="text-[#238636] font-medium">{bounty.reward}</span>
                  </div>
                  <div className="text-[#8b949e] text-sm mt-2">
                    Solved on {bounty.solvedDate}
                  </div>
                </div>
              ))}
            </div>
            <Link 
              href="/dashboard/bounties"
              className="inline-block mt-4 text-[#58a6ff] hover:underline"
            >
              View all bounties →
            </Link>
          </div>

          {/* Active Developers Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Active Developers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeDevelopers.map(dev => (
                <div key={dev.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex items-center gap-4">
                  <Image
                    src={dev.avatar}
                    alt={dev.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-medium">{dev.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#8b949e]">
                      <span>★ {dev.reputation}</span>
                      <span>•</span>
                      <span>{dev.bountiesSolved} bounties</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested Developers Section */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-4">Suggested Developers</h2>
          <div className="space-y-4">
            {suggestedDevs.map(dev => (
              <div key={dev.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src={dev.avatar}
                    alt={dev.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-medium">{dev.name}</h3>
                    <span className="text-[#238636] text-sm">{dev.matchRate}% match</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dev.expertise.map(skill => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-[#2d333b] text-[#8b949e] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md transition-colors duration-200">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <OnboardingModal 
        isOpen={false} 
        wallet={address || ''}
      />
    </div>
  );
} 
