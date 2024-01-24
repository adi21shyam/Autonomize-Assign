import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./RepoDetail.css";

const RepoDetails = () => {
  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username, repoName } = useParams();

  useEffect(() => {
    const fetchRepoDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        const data = await response.json();
        setRepoDetails(data);
      } catch (error) {
        console.error("Error fetching repository details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [username, repoName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!repoDetails) {
    return <div>Repository details not found.</div>;
  }

  return (
    <div className="repo-details">
      <div className="back-to-repo">
        <Link to={`/`}><button>Home</button></Link>
        <Link to={`/repos/${username}`}><button>Back to Repositories</button></Link>
      </div>
      <div className="repo-detail-col">
        <div className="repo-detail-col1">
          {/* Add an image source if available */}
          <img src={repoDetails.owner?.avatar_url || 'default-image-url.jpg'} alt={`${repoDetails.name}`} />
        </div>
        <div className="repo-detail-col2">
          <h4>Applications</h4>
          <h1>{repoDetails.name}</h1>
          <p>{repoDetails.description}</p>
          {repoDetails.web_commit_signoff_required ? <button>Set Up a Plan</button> : <button>Use the Plan</button>}
          <div>
            <strong>Stars:</strong> {repoDetails.stargazers_count}
          </div>
          <div>
            <strong>Watchers:</strong> {repoDetails.watchers_count}
          </div>
          <div>
            <strong>Forks:</strong> {repoDetails.forks_count}
          </div>
          <div>
            <strong>Open issues:</strong> {repoDetails.open_issues_count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;
