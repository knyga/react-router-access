import React from 'react';
import { Redirect } from 'react-router';

const generateRedirectChildComponent = path => () => (<Redirect to={path} />);

export default generateRedirectChildComponent;
