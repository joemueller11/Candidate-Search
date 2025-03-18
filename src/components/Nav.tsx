import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">Search</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/SavedCandidates" className="nav-link">Saved Candidates</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
