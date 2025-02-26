'use client';

import { useAccount } from 'wagmi';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/bounties', label: 'Bounties' },
    { href: '/dashboard/chatrooms', label: 'Chatrooms' },
  ];

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) return null;

  return (
    <div className="flex h-screen bg-[#0d1117] overflow-hidden">
      {/* Left Sidebar - Fixed */}
      <div className="w-80 h-screen border-r border-[#30363d] p-6 flex flex-col gap-6 bg-[#0d1117] overflow-y-auto">
        <div className="flex flex-col items-center gap-4">
          <Link href="/" className="text-white text-xl font-bold mb-4">
            BountyBase
          </Link>
          
          <div className="rounded-full bg-[#238636] w-24 h-24 flex items-center justify-center">
            <Image
              src="/default-avatar.png"
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-white">User Profile</h2>
            <p className="text-sm text-[#8b949e] mt-1">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>

          <span className="bg-[#238636] text-white px-3 py-1 rounded-full text-sm">
            Active
          </span>
        </div>

        {/* Stats */}
        <div className="mt-6 p-4 bg-[#161b22] rounded-lg">
          <h3 className="text-[#c9d1d9] font-medium mb-4">Stats</h3>
          <div className="space-y-6">
            <div className="bg-[#2d333b] p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#8b949e]">Bounties Fixed</span>
                <span className="text-[#238636] font-bold text-xl">12</span>
              </div>
              <div className="w-full bg-[#161b22] rounded-full h-2">
                <div className="bg-[#238636] h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="bg-[#2d333b] p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#8b949e]">Total Earned</span>
                <span className="text-[#238636] font-bold text-xl">2.5 ETH</span>
              </div>
              <div className="w-full bg-[#161b22] rounded-full h-2">
                <div className="bg-[#238636] h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="bg-[#2d333b] p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#8b949e]">Reputation</span>
                <span className="text-[#238636] font-bold">Level 4</span>
              </div>
              <div className="flex gap-1 mt-2">
                {Array(5).fill(null).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-6 h-6 rounded-sm ${i < 4 ? 'bg-[#238636]' : 'bg-[#2d333b]'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar - Only on right side */}
        <nav className="bg-[#161b22] border-b border-[#30363d] px-6 py-3 flex items-center justify-between">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-3 py-2 rounded-md transition-all duration-200 relative ${
                  pathname === link.href 
                    ? 'text-[#2ea043] font-medium bg-[#238636]/10 shadow-[0_0_8px_0px_#238636] before:absolute before:inset-0 before:rounded-md before:shadow-[0_0_12px_0px_#238636] before:opacity-50' 
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="relative z-50 [&_button]:bg-[#238636] [&_button]:hover:bg-[#2ea043] [&_button]:text-white [&_button]:rounded-md [&_button]:py-2 [&_button]:px-4 [&_button]:transition-colors [&_button]:duration-200 [&_div[role=dialog]]:absolute [&_div[role=dialog]]:right-0 [&_div[role=dialog]]:mt-2">
            <WalletDefault />
          </div>
        </nav>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 
