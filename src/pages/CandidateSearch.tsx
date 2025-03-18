import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  const loadNextCandidate = async () => {
    setLoading(true);
    const users = await searchGithub();
    if (users.length > 0) {
      const userDetails = await searchGithubUser(users[0].login);
      setCurrentCandidate(userDetails);
    } else {
      setCurrentCandidate(null);
    }
    setLoading(false);
  };

  const handleAccept = () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, currentCandidate]));
    }
    loadNextCandidate();
  };

  useEffect(() => {
    loadNextCandidate();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="candidate-search">
      <h1>Candidate Search</h1>
      <CandidateCard 
        candidate={currentCandidate}
        onAccept={handleAccept}
        onReject={loadNextCandidate}
      />
    </div>
  );
};

export default CandidateSearch;
