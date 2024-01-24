import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import RepoList from './pages/RepoPage';
import RepoDetails from './pages/RepoDetails';
import UserFollowers from './pages/UserFollower';

function App() {
  return (
    <Router>
         <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/repos/:username" element={<RepoList />} />
                <Route path="/repo/:username/:repoName" element={<RepoDetails />} />
                <Route path="/followers/:username" element={<UserFollowers />} />
            </Routes>
    </Router>
);
}

export default App;
