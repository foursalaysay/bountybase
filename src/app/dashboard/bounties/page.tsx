'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Bounty {
  id: number;
  title: string;
  repo: string;
  amount: string;
  deadline: string;
  status: 'open' | 'in-progress' | 'closed';
  imageUrl?: string;
}

export default function Bounties() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [githubLink, setGithubLink] = useState('');
  const [bountyAmount, setBountyAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errorImage, setErrorImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Example bounties data
  const bounties: Bounty[] = [
    {
      id: 1,
      title: "Memory Leak in Authentication",
      repo: "organization/repo-name",
      amount: "0.5 ETH",
      deadline: "2024-03-20",
      status: "open"
    },
    {
      id: 2,
      title: "Smart Contract Vulnerability",
      repo: "organization/smart-contracts",
      amount: "1.2 ETH",
      deadline: "2024-03-25",
      status: "in-progress"
    }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setErrorImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ githubLink, bountyAmount, deadline, errorImage });
    setIsModalOpen(false);
    // Reset form
    setGithubLink('');
    setBountyAmount('');
    setDeadline('');
    setErrorImage(null);
    setImagePreview('');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Bounties</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Create Bounty
        </button>
      </div>

      {/* Bounties List */}
      <div className="grid gap-4">
        {bounties.map((bounty) => (
          <div
            key={bounty.id}
            className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-[#58a6ff] transition-colors duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{bounty.title}</h3>
                <p className="text-[#8b949e] mb-4">Repository: {bounty.repo}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-[#238636]">{bounty.amount}</span>
                  <span className="text-[#8b949e]">Deadline: {bounty.deadline}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                bounty.status === 'open' ? 'bg-[#238636] text-white' :
                bounty.status === 'in-progress' ? 'bg-[#9e6a03] text-white' :
                'bg-[#8b949e] text-white'
              }`}>
                {bounty.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Bounty Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#161b22] rounded-lg p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Bounty</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#8b949e] mb-2">GitHub Link</label>
                <input
                  type="url"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#58a6ff]"
                  placeholder="https://github.com/organization/repo/issues/123"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8b949e] mb-2">Error Screenshot</label>
                <div className="border-2 border-dashed border-[#30363d] rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="error-image"
                  />
                  <label
                    htmlFor="error-image"
                    className="cursor-pointer text-[#58a6ff] hover:text-[#58a6ff] block"
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Error preview"
                        width={300}
                        height={200}
                        className="mx-auto"
                      />
                    ) : (
                      "Click to upload image"
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[#8b949e] mb-2">Bounty Amount (ETH)</label>
                <input
                  type="number"
                  value={bountyAmount}
                  onChange={(e) => setBountyAmount(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#58a6ff]"
                  placeholder="0.5"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8b949e] mb-2">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#58a6ff]"
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-[#8b949e] hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-2 rounded-md transition-colors duration-200"
                >
                  Create Bounty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
