'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';


interface UserProfile {
  username: string;
  email: string;
  wallet: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/bounties', label: 'Bounties' },
    { href: '/dashboard/chatrooms', label: 'Chatrooms' },
  ];

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!address) return;
      
      try {
        const response = await fetch(`/api/dashboard?wallet=${address}`);
        const data = await response.json();
        
        if (response.ok && data.user) {
          setUserProfile(data.user);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [address]);

  if (!isConnected) return null;

  return (
    <div className="flex h-screen bg-[#0d1117]">
      <div className="w-80 h-screen border-r border-[#30363d] flex flex-col bg-[#0d1117]">
        {/* Top Profile Section */}
        <div className="p-6 border-b border-[#30363d]">
          <div className="text-center mb-6">
            <Link href="/" className="text-white text-xl font-bold inline-block">
              BountyBase
            </Link>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Profile Picture */}
            <div className="w-24 h-24 bg-[#238636] rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-lg">.Profile</span>
            </div>
            
            {/* Username and Email */}
            <h2 className="text-xl font-bold text-white mb-1">
              {userProfile?.username || 'Loading...'}
            </h2>
            <p className="text-sm text-[#8b949e] mb-2">
              {userProfile?.email || 'Loading...'}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  pathname === link.href 
                    ? 'text-[#2ea043] bg-[#238636]/10 font-medium' 
                    : 'text-[#8b949e] hover:text-white hover:bg-[#30363d]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Wallet Section */}
        <div className="p-4 border-t border-[#30363d] space-y-3">
          {/* Wallet Address with Copy Button */}
          <button 
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#161b22] rounded-lg hover:bg-[#238636]/10 transition-colors group"
          >
            <span className="text-sm text-[#8b949e] group-hover:text-[#2ea043]">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
            </span>
            {copied ? (
              <svg className="w-4 h-4 text-[#2ea043]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-[#8b949e] group-hover:text-[#2ea043]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>

          {/* Wallet Connect/Disconnect Button */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Wallet</span>
            </button>

            {showDropdown && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#161b22] border border-[#30363d] rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    disconnect();
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-left text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 
