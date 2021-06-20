import React from 'react';
import './HackerNewsBanner.scss';
import {dictionary} from '../../lang/en';

export const HackerNewsBanner = () => {
  return (
    <h1 className='_hacker-news-banner'>
      {dictionary.application.hackerNews}
    </h1>
  );
};
