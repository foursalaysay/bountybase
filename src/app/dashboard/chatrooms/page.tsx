'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ChatRoom {
  id: number;
  name: string;
  topic: string;
  participants: number;
  isPrivate: boolean;
  lastMessage: string;
  lastMessageTime: string;
}

interface PrivateChat {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
}

export default function ChatRooms() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomTopic, setNewRoomTopic] = useState('');
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');

  const publicRooms: ChatRoom[] = [
    {
      id: 1,
      name: "Smart Contract Security",
      topic: "Security",
      participants: 24,
      isPrivate: false,
      lastMessage: "What's the best practice for reentrancy protection?",
      lastMessageTime: "5m ago"
    },
    {
      id: 2,
      name: "Frontend Development",
      topic: "Development",
      participants: 15,
      isPrivate: false,
      lastMessage: "Anyone experienced with Next.js 14?",
      lastMessageTime: "12m ago"
    }
  ];

  const privateChats: PrivateChat[] = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "/default-avatar.png",
      status: "online",
      lastMessage: "Thanks for the help with the bug fix!",
      lastMessageTime: "2m ago"
    },
    {
      id: 2,
      name: "Sarah Kim",
      avatar: "/default-avatar.png",
      status: "offline",
      lastMessage: "Let's discuss the implementation tomorrow",
      lastMessageTime: "1h ago",
      unreadCount: 3
    }
  ];

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle room creation logic here
    setIsCreateModalOpen(false);
    setNewRoomName('');
    setNewRoomTopic('');
    setIsPrivateRoom(false);
  };

  return (
    <div className="h-full flex">
      {/* Chat List Sidebar */}
      <div className="w-80 min-w-[320px] border-r border-[#30363d] bg-[#161b22] p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Chat Rooms</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#238636] hover:bg-[#2ea043] text-white px-3 py-1.5 rounded-md text-sm transition-colors duration-200"
          >
            New Chat
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mb-4 bg-[#0d1117] rounded-lg p-1">
          <button
            onClick={() => setActiveTab('public')}
            className={`flex-1 py-2 text-sm rounded-md transition-colors duration-200 ${
              activeTab === 'public'
                ? 'bg-[#238636] text-white'
                : 'text-[#8b949e] hover:text-white'
            }`}
          >
            Public
          </button>
          <button
            onClick={() => setActiveTab('private')}
            className={`flex-1 py-2 text-sm rounded-md transition-colors duration-200 ${
              activeTab === 'private'
                ? 'bg-[#238636] text-white'
                : 'text-[#8b949e] hover:text-white'
            }`}
          >
            Private
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {activeTab === 'public' ? (
            // Public Rooms
            publicRooms.map(room => (
              <div
                key={room.id}
                className="p-3 rounded-lg hover:bg-[#1c2128] cursor-pointer transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-white font-medium">{room.name}</h3>
                  <span className="text-xs text-[#8b949e]">{room.lastMessageTime}</span>
                </div>
                <div className="text-sm text-[#8b949e] mb-1">
                  {room.participants} participants • {room.topic}
                </div>
                <p className="text-sm text-[#8b949e] truncate">{room.lastMessage}</p>
              </div>
            ))
          ) : (
            // Private Chats
            privateChats.map(chat => (
              <div
                key={chat.id}
                className="p-3 rounded-lg hover:bg-[#1c2128] cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center space-x-3 max-w-full">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={chat.avatar}
                      alt={chat.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                      chat.status === 'online' ? 'bg-[#238636]' : 'bg-[#8b949e]'
                    } border-2 border-[#161b22]`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-white font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-[#8b949e] flex-shrink-0 ml-2">{chat.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-[#8b949e] truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unreadCount && (
                    <div className="flex-shrink-0 ml-2">
                      <span className="bg-[#238636] text-white text-xs px-2 py-1 rounded-full">
                        {chat.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0d1117] p-4">
        <div className="flex-1 flex items-center justify-center text-[#8b949e]">
          Select a chat to start messaging
        </div>
      </div>

      {/* Create Chat Room Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#161b22] rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Create New Chat Room</h2>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-[#8b949e] mb-2">Room Name</label>
                <input
                  type="text"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#58a6ff]"
                  placeholder="Enter room name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#8b949e] mb-2">Topic</label>
                <input
                  type="text"
                  value={newRoomTopic}
                  onChange={(e) => setNewRoomTopic(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#58a6ff]"
                  placeholder="Enter topic"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="private-room"
                  checked={isPrivateRoom}
                  onChange={(e) => setIsPrivateRoom(e.target.checked)}
                  className="rounded border-[#30363d] bg-[#0d1117] text-[#238636] focus:ring-[#238636]"
                />
                <label htmlFor="private-room" className="text-[#8b949e]">
                  Make this room private
                </label>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-[#8b949e] hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-2 rounded-md transition-colors duration-200"
                >
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
