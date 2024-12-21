import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AlbumDetail() {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchAlbumAndPhotos = async () => {
            try {
                const albumResponse = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`);
                if (!albumResponse.ok) {
                    throw new Error('The network is not responding');
                }
                const albumData = await albumResponse.json();
                setAlbum(albumData);

                const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
                if (!photosResponse.ok) {
                    throw new Error('The network is not responding');
                }
                const photosData = await photosResponse.json();
                setPhotos(photosData.slice(0, 15)); 

                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${albumData.userId}`);
                if (!userResponse.ok) {
                    throw new Error('The network is not responding');
                }
                const userData = await userResponse.json();
                setUser(userData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAlbumAndPhotos();
    }, [id]);

    return (
        <div>
            {album ? (
                <>
                    <h2>Album photos: {album.title}</h2>
                    {user && <h3>Created by: {user.name}</h3>}
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {photos.map((photo) => (
                            <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} style={{ margin: '5px', width: '300px' }} />
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default AlbumDetail;