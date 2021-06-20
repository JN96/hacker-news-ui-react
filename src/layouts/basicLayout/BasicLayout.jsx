import React from 'react';
import './BasicLayout.scss';
import PropTypes from 'prop-types';
import {Spinner} from '../../components/spinner/Spinner';
import {Error} from '../../components/error/Error';
import {HackerNewsBanner} from '../../components/hackerNewsBanner/HackerNewsBanner';

export const BasicLayout = ({
  hackerNewsBanner,
  children,
  error,
  loading
}) => {
  return (
    <div className='_basic-layout-container'>
      {hackerNewsBanner && (
        <HackerNewsBanner/>
      )}
      {error && error !== null && (
        <Error message={error}/>
      )}
      {loading && (
        <Spinner/>
      )}
      {children}
    </div>
  );
};

BasicLayout.propTypes = {
  hackerNewsBanner: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.any,
  error: PropTypes.any
};
