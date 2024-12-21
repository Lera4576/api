import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserDetail from './UserDetail';
import AlbumDetail from './AlbumDetail';
import AllAlbums from './AllAlbums';
import NotFound from './NotFound';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('The network is not responding');
                }
                const data = await response.json();
                setUsers(data.slice(0, 10)); 
            } catch (error) {
                console.error('Error getting users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Router>
            <div className="container">
                {}
                <nav style={{ marginBottom: '20px' }}>
                    <Link to="/" className="nav-link">Users</Link>
                    <Link to="/albums" className="nav-link">Albums</Link>
                </nav>
                <Routes>
                    <Route path="/user/:id" element={<UserDetail />} />
                    <Route path="/album/:id" element={<AlbumDetail />} />
                    <Route path="/" element={
                        <>
                            <h1>User list</h1>
                            <ul>
                                {users.map((user) => (
                                    <li key={user.id}>
                                        <Link to={`/user/${user.id}`} style={{ cursor: 'pointer' }}>
                                            {user.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    } />
                    <Route path="/albums" element={<AllAlbums />} />
                    <Route path="*" element={<NotFound />} /> {}
                </Routes>
            </div>
        </Router>
    );
}

export default App;