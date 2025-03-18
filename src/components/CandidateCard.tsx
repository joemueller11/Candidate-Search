import { Candidate } from '../interfaces/Candidate.interface';

interface Props {
  candidate: Candidate | null;
  onAccept?: () => void;
  onReject?: () => void;
  showActions?: boolean;
}

const CandidateCard = ({ candidate, onAccept, onReject, showActions = true }: Props) => {
  if (!candidate) {
    return <div className="card">No more candidates available</div>;
  }

  return (
    <div className="card">
      <img src={candidate.avatar_url} alt={candidate.login} className="avatar" />
      <div className="info">
        <h2>{candidate.name || candidate.login}</h2>
        <p>Username: <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">{candidate.login}</a></p>
        <p>Location: {candidate.location || 'Not specified'}</p>
        <p>Email: {candidate.email || 'Not specified'}</p>
        <p>Company: {candidate.company || 'Not specified'}</p>
      </div>
      {showActions && (
        <div className="actions">
          <button onClick={onReject}>-</button>
          <button onClick={onAccept}>+</button>
        </div>
      )}
    </div>
  );
};

export default CandidateCard;
