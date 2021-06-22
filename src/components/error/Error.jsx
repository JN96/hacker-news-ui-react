import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export const Error = ({
  message
}) => {
  return (
    <div>
      <ErrorOutlineIcon color='error' className='_error-icon'/>
      <p className='_error'>{message}</p>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string
};
