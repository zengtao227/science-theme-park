'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { User, ChevronDown, Plus } from 'lucide-react';

export default function UserSwitcher() {
  const { currentUser, getUserList, switchUser, createUser } = useAppStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const users = getUserList();

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newUsername.trim();
    if (trimmed) {
      createUser(trimmed);
      setNewUsername('');
      setShowNewUser(false);
      setShowMenu(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 border border-white/60 hover:border-neon-green/50 transition-colors bg-black/50 min-h-[44px]"
      >
        <User className="w-4 h-4 text-neon-green" />
        <span className="text-sm font-mono text-white">{currentUser}</span>
        <ChevronDown className="w-3 h-3 text-white" />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowMenu(false);
              setShowNewUser(false);
            }}
          />
          <div className="absolute top-full right-0 mt-2 bg-black border-2 border-white/60 min-w-[220px] z-50 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {!showNewUser ? (
              <>
                <div className="p-2 border-b border-white/10">
                  <div className="text-[10px] text-white/90 font-mono uppercase tracking-wider px-2 py-1">
                    Switch User
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {users.map((user) => (
                    <button
                      key={user.username}
                      onClick={() => {
                        switchUser(user.username);
                        setShowMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-2 ${
                        user.username === currentUser ? 'bg-neon-green/10 text-neon-green' : 'text-white'
                      }`}
                    >
                      <User className="w-3 h-3" />
                      <span className="text-sm font-mono">{user.username}</span>
                      {user.username === currentUser && (
                        <span className="ml-auto text-[10px] text-neon-green">●</span>
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowNewUser(true)}
                  className="w-full px-4 py-3 text-left border-t border-white/10 text-neon-green hover:bg-neon-green/10 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-3 h-3" />
                  <span className="text-sm font-mono">Add User</span>
                </button>
              </>
            ) : (
              <form onSubmit={handleCreateUser} className="p-4">
                <div className="text-[10px] text-white/90 font-mono uppercase tracking-wider mb-3">
                  New User
                </div>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter name..."
                  className="w-full p-2 bg-black border border-white/60 text-white text-sm font-mono focus:border-neon-green focus:outline-none mb-3"
                  autoFocus
                  maxLength={30}
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={!newUsername.trim()}
                    className="flex-1 px-3 py-2 bg-neon-green text-black text-xs font-black hover:bg-neon-green/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    CREATE
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewUser(false);
                      setNewUsername('');
                    }}
                    className="px-3 py-2 border border-white/60 text-white text-xs hover:bg-white/10 transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}
