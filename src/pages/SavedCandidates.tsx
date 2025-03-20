import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  if (savedCandidates.length === 0) {
    return (
      <div>
        <h1>Potential Candidates</h1>
        <p>No candidates Saved.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <div className="candidates-grid">
        {savedCandidates.map((candidate) => (
          <CandidateCard 
            key={candidate.id}
            candidate={candidate}
            showActions={false}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;
