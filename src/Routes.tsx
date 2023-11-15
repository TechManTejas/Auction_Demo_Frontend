import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import AuctionPage from './components/auction/AuctionPage';
import SuccessPage from './components/auction/SuccessPage';
import FailurePage from './components/auction/FailedPage';
import HomePage from './components/home/HomePage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failure" element={<FailurePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
