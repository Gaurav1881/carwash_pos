import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';

import { SERVICES } from '../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  card: {
    width: '500px',
    height: 'auto',
    margin: '30px',
    backgroundColor: '#ffffff',
  },
  buttonBase: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
  },
  cardHeading: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  cardPrice: {
    fontSize: '20px',
  },
  includes: {
    width: '100%',
    textAlign: 'left',
  },
  priceWrapper: {
    width: '100%',
    marginTop: 'auto',
    textAlign: 'center',
  },
}));

const DisplayServices = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {SERVICES.map((service, index) => (
        <Card className={classes.card} key={index}>
          <ButtonBase
            className={classes.buttonBase}
            onClick={() => props.onSelectService(service)}
          >
            <CardContent className={classes.cardContent}>
              <Typography className={classes.cardHeading}>
                {service.name}
              </Typography>
              <div className={classes.includes}>
                <Typography>Includes</Typography>
                <ul>
                  {service.includes.map(includes => (
                    <li> {includes.name} </li>
                  ))}
                </ul>
              </div>
              <div className={classes.priceWrapper}>
                <Typography className={classes.cardPrice}>
                  ${service.price}
                </Typography>
              </div>
            </CardContent>
          </ButtonBase>
        </Card>
      ))}
    </div>
  );
};

export default DisplayServices;
