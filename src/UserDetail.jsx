import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!response.ok) {
                    throw new Error('The network is not responding');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error getting user:', error);
            }
        };

        const fetchAlbums = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
                if (!response.ok) {
                    throw new Error('The network is not responding');
                }
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                console.error('Error receiving albums:', error);
            }
        };

        fetchUser();
        fetchAlbums();
    }, [id]);

    return (
        <div>
            {user && (
                <>
                    <h2>User information</h2>
                    <p><strong>Username:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Site:</strong> {user.website}</p>
                </>
            )}

            <h3>Albums</h3>
            <ul>
                {albums.map((album) => (
                    <li key={album.id}>
                        <Link to={`/album/${album.id}`}>{album.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserDetail;