import React from 'react';
import './Spinner.scss';
import {CircularProgress} from '@material-ui/core';

export const Spinner = () => {
  return (
    <CircularProgress
      className='_spinner'
      color='primary'
      size={60}
      thickness={4}
      disableShrink={true}
    />
  );
};
