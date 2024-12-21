import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="error">
            <h2>404</h2>
            <p>Page not found</p>
            <Link to="/">Go to page Users</Link>
        </div>
    );
}

export default NotFound;