/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { makeStyles } from '@material-ui/core';
import ServiceSelectionPage from '../ServiceSelection';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#bdbdbd',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/" component={ServiceSelectionPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
  );
}
