import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./UserFollower.css"

const UserFollowers = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { username } = useParams();

    useEffect(() => {
        const fetchFollowers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.github.com/users/${username}/followers`);
                const data = await response.json();
                setFollowers(data);
            } catch (error) {
                console.error('Error fetching followers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();
    }, [username]);

    if (loading) {
        return <div className="loading">Loading followers...</div>;
    }

    return (
        <div className="followers-container">
            <h2>{username}'s Followers</h2>
            <ul className="followers-list">
                {followers.map(follower => (
                    <li key={follower.id}>
                        <img src={follower.avatar_url} alt={follower.login} />
                        <Link to={`/repos/${follower.login}`}>{follower.login}</Link>
                    </li>
                ))}
            </ul>
            <div className="back-link">
                <Link to={`/repos/${username}`}>Back to Repositories</Link>
            </div>
        </div>
    );
};

export default UserFollowers;
