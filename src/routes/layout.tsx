import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/basics">Basics</Link>
            </li>
            <li>
              <Link to="/internalTransition">Internal Transition</Link>
            </li>
            <li>
              <Link to="/nesting">Compound states</Link>
            </li>
            <li>
              <Link to="/crud">CRUD</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
