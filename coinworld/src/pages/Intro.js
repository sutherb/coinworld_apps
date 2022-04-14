import React from 'react';
import { Link, Redirect } from "react-router-dom";

import { 
  useSelector,
} from 'react-redux';

import {
  //apiActiveSelector,
  portfolioDataSelector,
} from '../redux/apiCallsSlice';

const Intro = () => {
  //const selectApiActive = useSelector(apiActiveSelector);
  const selectPortfolioData = useSelector(portfolioDataSelector);

  //if (selectApiActive) return <div>Loading data ...</div>;
  if (selectPortfolioData.length > 0) return <Redirect to={'/portfolio'} />;
  
  return (
    <section id="intro">
      <h2>Welcome to Coin World!</h2>
      <p>Add the first crypto currency to your portfolio:</p>
      <Link className="btn btn-primary" to = "/portfolio/edit/add">Let's Go!</Link>
    </section>
    );
  
}

export default Intro;