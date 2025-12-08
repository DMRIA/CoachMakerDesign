import { useState, useEffect } from 'react';

// Mock data for initial implementation since we don't have an API key yet
const MOCK_VIDEOS = [
    {
        id: '-p2-YQMFSdc',
        title: '5 Best Tackling Drills For Practice',
        thumbnail: 'https://img.youtube.com/vi/-p2-YQMFSdc/maxresdefault.jpg',
        description: 'Essential tackling drills for high school defense.',
        publishedAt: '2025-10-15T12:00:00Z',
    },
    {
        id: 'Zf1z_s8u8fE',
        title: '5 Competitive Practice Drills',
        thumbnail: 'https://img.youtube.com/vi/Zf1z_s8u8fE/maxresdefault.jpg',
        description: 'High energy drills to up the competition.',
        publishedAt: '2025-09-20T10:00:00Z',
    },
    {
        id: 'y2sL43-y72Y',
        title: 'Best High School QB Drills',
        thumbnail: 'https://img.youtube.com/vi/y2sL43-y72Y/maxresdefault.jpg',
        description: 'Top drills for quarterbacks.',
        publishedAt: '2025-08-10T14:30:00Z',
    },
    {
        id: 'uK1A9aB_j0U',
        title: 'Speed & Agility Training',
        thumbnail: 'https://img.youtube.com/vi/uK1A9aB_j0U/maxresdefault.jpg',
        description: 'Essential speed work for all positions.',
        publishedAt: '2025-07-05T09:00:00Z',
    }
];

export const useYouTubePlaylist = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulating API call
        const fetchVideos = async () => {
            try {
                setLoading(true);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));
                setVideos(MOCK_VIDEOS);
            } catch (err) {
                setError('Failed to fetch videos');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return { videos, loading, error };
};
