import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNextCandidate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const users = await searchGithub();
      if (!users || users.length === 0) {
        setCurrentCandidate(null);
        setError('No candidates found');
        return;
      }

      const userDetails = await searchGithubUser(users[0].login);
      if (!userDetails || !userDetails.login) {
        setError('Failed to load candidate details');
        return;
      }

      setCurrentCandidate(userDetails);
    } catch (err) {
      console.error('Error in loadNextCandidate:', err);
      setError(err instanceof Error ? err.message : 'Error loading candidate');
      setCurrentCandidate(null);
    } finally {
      setLoading(false);
    }
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
    return <div>Loading candidate information...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
