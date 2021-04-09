import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { SERVICES } from '../../constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  checkboxWrapper: {
    // backgroundColor: "#e2e2e2",
    width: '100%',
  },
  checkboxes: {
    width: '400px',
    height: '100px',
    margin: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
  },
  checkboxControlWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addOnPrice: {
    width: '50px',
  },
  addOnName: {
    textAlign: 'left',
    width: '200px',
  },
}));

const ConfigureAddOns = props => {
  const classes = useStyles();

  const tempState = {};
  const checkKeys = [];
  if (props.baseService) {
    props.baseService.addOns.forEach((val, index) => {
      const checkKey = `check${index}`;
      checkKeys.push(checkKey);
      tempState[checkKey] = false;
    });
  }

  const [state, setState] = React.useState(tempState);

  const handleChange = (checkKey, addOn) => {
    const value = state[checkKey];
    const tempState = { ...state };
    tempState[checkKey] = !value;
    setState(tempState);

    if (!value) {
      props.onClickAddAddOn(addOn);
    } else {
      props.onClickRemoveAddOn(addOn);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.checkboxWrapper}>
        {props.baseService != null &&
          props.baseService.addOns.map((addOn, index) => (
            <FormControlLabel
              control={
                <div className={classes.checkboxControlWrapper}>
                  <Checkbox
                    checked={state[checkKeys[index]]}
                    onChange={() => handleChange(checkKeys[index], addOn)}
                    name="checkedB"
                    color="primary"
                  />
                  <Typography className={classes.addOnName}>
                    {' '}
                    {addOn.name}{' '}
                  </Typography>
                  <Typography className={classes.addOnPrice}>
                    {' $'}
                    {addOn.price}{' '}
                  </Typography>
                </div>
              }
              className={classes.checkboxes}
            />
          ))}
      </div>
    </div>
  );
};

export default ConfigureAddOns;
