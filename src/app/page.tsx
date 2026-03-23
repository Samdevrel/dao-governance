'use client';

import { useState } from 'react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: 'active' | 'passed' | 'failed' | 'pending';
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  quorum: number;
  threshold: number;
  endDate: string;
}

interface Voter {
  address: string;
  tokenBalance: number;
  delegatedTo?: string;
  votingPower: number;
}

const proposals: Proposal[] = [
  {
    id: 'PROP-001',
    title: 'Add USDC as collateral asset',
    description: 'Proposal to add USDC as a supported collateral asset with 80% LTV.',
    proposer: '0x7a...9f2e',
    status: 'active',
    forVotes: 2500000,
    againstVotes: 800000,
    abstainVotes: 200000,
    quorum: 4,
    threshold: 66,
    endDate: '2026-03-25',
  },
  {
    id: 'PROP-002',
    title: 'Deploy to Arbitrum',
    description: 'Deploy protocol contracts to Arbitrum One for lower gas fees.',
    proposer: '0x3c...1d4a',
    status: 'passed',
    forVotes: 4200000,
    againstVotes: 300000,
    abstainVotes: 100000,
    quorum: 4,
    threshold: 66,
    endDate: '2026-03-18',
  },
  {
    id: 'PROP-003',
    title: 'Increase quorum to 5%',
    description: 'Increase minimum quorum from 4% to 5% for enhanced governance security.',
    proposer: '0x5f...7a8b',
    status: 'failed',
    forVotes: 1200000,
    againstVotes: 2800000,
    abstainVotes: 500000,
    quorum: 4,
    threshold: 66,
    endDate: '2026-03-15',
  },
  {
    id: 'PROP-004',
    title: 'Treasury diversification',
    description: 'Diversify treasury by allocating 20% to stablecoins.',
    proposer: '0x2a...9c1d',
    status: 'pending',
    forVotes: 0,
    againstVotes: 0,
    abstainVotes: 0,
    quorum: 4,
    threshold: 66,
    endDate: '2026-03-28',
  },
];

const voters: Voter[] = [
  { address: '0x7a...9f2e', tokenBalance: 150000, votingPower: 150000 },
  { address: '0x3c...1d4a', tokenBalance: 85000, delegatedTo: '0x7a...9f2e', votingPower: 0 },
  { address: '0x5f...7a8b', tokenBalance: 220000, votingPower: 305000 },
  { address: '0x2a...9c1d', tokenBalance: 45000, votingPower: 45000 },
];

export default function Home() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [userVote, setUserVote] = useState<'for' | 'against' | 'abstain' | null>(null);

  const totalSupply = 100000000;
  const totalVotes = (p: Proposal) => p.forVotes + p.againstVotes + p.abstainVotes;
  const quorumReached = (p: Proposal) => (totalVotes(p) / totalSupply) * 100 >= p.quorum;
  const passRate = (p: Proposal) => totalVotes(p) > 0 ? (p.forVotes / totalVotes(p)) * 100 : 0;

  const castVote = (vote: 'for' | 'against' | 'abstain') => {
    setUserVote(vote);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-indigo-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">DAO Governance</h1>
          <p className="text-gray-400 mt-2">Vote on proposals with token-weighted governance</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-indigo-400 p-4 text-center">
            <div className="text-3xl font-black text-indigo-400">4</div>
            <div className="text-sm text-gray-400">Proposals</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">4%</div>
            <div className="text-sm text-gray-400">Quorum</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">66%</div>
            <div className="text-sm text-gray-400">Threshold</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">100M</div>
            <div className="text-sm text-gray-400">Total Supply</div>
          </div>
        </section>

        {/* Proposals */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Proposals</h2>
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                onClick={() => setSelectedProposal(proposal)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedProposal?.id === proposal.id
                    ? 'bg-indigo-900/30 border-indigo-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs text-gray-400">{proposal.id}</span>
                    <h3 className="font-bold text-indigo-400">{proposal.title}</h3>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold ${
                    proposal.status === 'active' ? 'bg-blue-900 text-blue-400' :
                    proposal.status === 'passed' ? 'bg-green-900 text-green-400' :
                    proposal.status === 'failed' ? 'bg-red-900 text-red-400' :
                    'bg-yellow-900 text-yellow-400'
                  }`}>
                    {proposal.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{proposal.description}</p>
                
                {proposal.status !== 'pending' && (
                  <div className="space-y-2">
                    <div className="flex gap-1 h-3">
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${passRate(proposal)}%` }}
                      />
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${totalVotes(proposal) > 0 ? (proposal.againstVotes / totalVotes(proposal)) * 100 : 0}%` }}
                      />
                      <div 
                        className="bg-gray-500" 
                        style={{ width: `${totalVotes(proposal) > 0 ? (proposal.abstainVotes / totalVotes(proposal)) * 100 : 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>For: {(proposal.forVotes / 1000000).toFixed(1)}M</span>
                      <span>Against: {(proposal.againstVotes / 1000000).toFixed(1)}M</span>
                      <span>Abstain: {(proposal.abstainVotes / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="text-xs">
                      <span className={quorumReached(proposal) ? 'text-green-400' : 'text-red-400'}>
                        Quorum: {((totalVotes(proposal) / totalSupply) * 100).toFixed(1)}% / {proposal.quorum}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Vote UI */}
        {selectedProposal && selectedProposal.status === 'active' && (
          <section className="bg-gray-900 border-4 border-indigo-400 p-6">
            <h2 className="text-xl font-black text-indigo-400 mb-4">Cast Your Vote</h2>
            <p className="text-gray-300 mb-4">{selectedProposal.title}</p>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => castVote('for')}
                className={`py-4 font-bold border-4 transition-all ${
                  userVote === 'for' 
                    ? 'bg-green-500 border-green-400 text-white' 
                    : 'bg-gray-800 border-gray-600 hover:border-green-400'
                }`}
              >
                FOR ✓
              </button>
              <button
                onClick={() => castVote('against')}
                className={`py-4 font-bold border-4 transition-all ${
                  userVote === 'against' 
                    ? 'bg-red-500 border-red-400 text-white' 
                    : 'bg-gray-800 border-gray-600 hover:border-red-400'
                }`}
              >
                AGAINST ✗
              </button>
              <button
                onClick={() => castVote('abstain')}
                className={`py-4 font-bold border-4 transition-all ${
                  userVote === 'abstain' 
                    ? 'bg-gray-500 border-gray-400 text-white' 
                    : 'bg-gray-800 border-gray-600 hover:border-gray-400'
                }`}
              >
                ABSTAIN —
              </button>
            </div>
            {userVote && (
              <div className="mt-4 p-3 bg-indigo-900/30 border border-indigo-500 text-center">
                Vote recorded: <span className="font-bold">{userVote.toUpperCase()}</span>
              </div>
            )}
          </section>
        )}

        {/* Delegation */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Top Voters</h2>
          <div className="space-y-2">
            {voters.sort((a, b) => b.votingPower - a.votingPower).map((voter) => (
              <div key={voter.address} className="p-3 bg-gray-800 border border-gray-700 flex justify-between items-center">
                <div>
                  <span className="font-mono text-indigo-400">{voter.address}</span>
                  {voter.delegatedTo && (
                    <span className="ml-2 text-xs text-gray-400">
                      → delegated to {voter.delegatedTo}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold">{voter.votingPower.toLocaleString()} VP</div>
                  <div className="text-xs text-gray-400">{voter.tokenBalance.toLocaleString()} tokens</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How DAO Governance Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-indigo-400 mb-2">Propose</h3>
              <p className="text-xs text-gray-400">Token holders submit proposals</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Snapshot</h3>
              <p className="text-xs text-gray-400">Off-chain signaling on Snapshot</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Vote</h3>
              <p className="text-xs text-gray-400">On-chain binding vote</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Execute</h3>
              <p className="text-xs text-gray-400">Smart contract execution</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-indigo-400 hover:underline">@samdevrel</a>
          <button
            onClick={() => window.location.href = '/docs/overview'}
            className="w-full py-4 bg-purple-500 text-white font-bold border-4 border-purple-400 hover:bg-purple-400 mb-4"
          >
            {buttonText}
          </button>
                    </p>
        </footer>
      </div>
    </main>
  );
}
