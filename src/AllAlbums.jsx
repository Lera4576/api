import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllAlbums() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAllAlbums = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/albums');
                if (!response.ok) {
                    throw new Error('The network is not responding');
                }
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                console.error('Error receiving albums:', error);
            }
        };

        fetchAllAlbums();
    }, []);

    return (
        <div>
            <h2>Albums of all users</h2>
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

export default AllAlbums;