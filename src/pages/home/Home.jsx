import React from 'react';
import './Home.scss'
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';
import Upcoming from './upcoming/Upcoming';
import Horror from './horror/Horror';
import Comedy from './comedy/Comedy';
import Action from './action/Action'
import Romantic from './romantic/Romantic';
import Animation from './animation/Animation';
import Documentary from './documentary/Documentary';
import Scifi from './scifi/Scifi';
const Home = () => {
  return (
    <div className='Home'>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      <Upcoming />
      <Horror />
      <Comedy />
      <Action />
      <Romantic />
      <Animation />
      <Documentary />
      <Scifi />
  
    </div>
 
  )
}

export default Home