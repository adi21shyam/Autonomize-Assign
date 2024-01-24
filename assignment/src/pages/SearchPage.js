import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Added import for Link
import "./SearchPage.css"

const SearchPage = () => {
    const [username, setUsername] = useState('');
    const [check, setCheck] = useState(false);

    const handleSubmit = () => {
        setCheck(username !== '');
    };

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub Username"
                />
                <button onClick={handleSubmit}>Search</button>
            </div>
            {check && <div className='view-repo'><Link to={`/repos/${username}`}><button>Go to {username} GitHub Account</button></Link></div>} 
        </div>
    );
};

export default SearchPage;
