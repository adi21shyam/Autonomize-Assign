import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./RepoList.css"

const RepoList = () => {
    const [repos, setRepos] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const {username}  = useParams()
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
                const repoData = await repoResponse.json();

                const userResponse = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userResponse.json();

                console.log(userData,"data")
                if(userData.message === 'Not Found'){
                    setRepos([]);
                    setUserInfo(null);
                }
                else{
                    setRepos(repoData);
                    setUserInfo(userData);
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);
                setUserInfo(null);
                setRepos([])
               
                // Handle errors as needed
            } finally {
                setLoading(false);
                
            }
        };

        fetchData();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className=''>
            <div className='home'><Link to={'/'}><button>Home</button></Link></div>
            {userInfo ? (
                <div className="user-info">
                    <div className='user-image'>
                        <img src={userInfo.avatar_url} alt={userInfo.name} />
                    </div>
                    <div>
                        <h2>{userInfo.name}</h2>
                        <p>{userInfo.bio}</p>
                        <Link to={`/followers/${username}`}><button>View Followers</button></Link>
                    </div>
                    <div>
                        <p>Company: <strong>{userInfo.company}</strong></p>
                        <p>Followers:<strong> {userInfo.followers}</strong></p>
                        <p>Following:<strong> {userInfo.following}</strong></p>
                    </div>
                </div>
            ) :(<div>No Data Found</div>)}
           {repos && 
           (<div className="repo-list">
                {repos.map(repo => (
                    <div className='repo-semi-detail-div' key={repo.id}>
                        <Link to={`/repo/${username}/${repo.name}`} className='repo-semi-detail'>
                            <div className='repo-semi-image'>
                                <img src={userInfo.avatar_url} alt={userInfo.name} />
                            </div>
                            <div className='repo-semi-description'>
                            <h3 >{repo.name}</h3>
                            <p>{repo.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>)}
        </div>
    );
};

export default RepoList;
