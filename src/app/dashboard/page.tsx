'use client';

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

export default function Dashboard() {
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

  return (
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
                <div className="relative">
                  <Image
                    src={dev.avatar}
                    alt={dev.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                    dev.status === 'online' ? 'bg-[#238636]' : 'bg-[#8b949e]'
                  } border-2 border-[#161b22]`} />
                </div>
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
  );
} 
