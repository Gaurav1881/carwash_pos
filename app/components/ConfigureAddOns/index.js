import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { SERVICES } from '../../constants';
import { IconButton } from '@material-ui/core';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  checkboxsWrapper: {
    // backgroundColor: "#e2e2e2",
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  checkboxWrapper: {
    margin: '20px',
  },
  checkboxes: {
    width: '400px',
    height: '100px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
  },
  checkboxControlWrapper: {
    width: '100%',
    height: '100px',
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
    width: '180px',
  },
  addOnButtons: {
    height: '100%',
  },
  badge: {
    fontSize: '16px',
    backgroundColor: '#ea7777',
    color: 'white',
  },
}));

const ConfigureAddOns = props => {
  const classes = useStyles();

  // const handleChange = (checkKey, addOn) => {
  //   const value = state[checkKey];
  //   const tempState = { ...state };
  //   tempState[checkKey] = !value;
  //   setState(tempState);
  //
  //   if (!value) {
  //     props.onClickAddAddOn(addOn);
  //   } else {
  //     props.onClickRemoveAddOn(addOn);
  //   }
  // };

  const handleAddOne = (addOn) => {
    props.onClickAddAddOn(addOn);
  };

  const handleRemoveOne = (addOn) => {
    props.onClickRemoveAddOn(addOn);
  };

  return (
    <div className={classes.root}>
      <div className={classes.checkboxsWrapper}>
        {props.baseService != null &&
          props.addOns.map((addOn, index) => (
            <div className={classes.checkboxWrapper}>
              <Badge badgeContent={addOn.quantity} classes={{ badge: classes.badge }}>
                <div className={classes.checkboxes}  style={{border : addOn.quantity > 0 ? 'thick solid #ea7777' : ''}}>
                  <div className={classes.checkboxControlWrapper}>
                    {/*<Checkbox*/}
                    {/*  checked={state[checkKeys[index]]}*/}
                    {/*  onChange={() => handleChange(checkKeys[index], addOn)}*/}
                    {/*  name="checkedB"*/}
                    {/*  color="primary"*/}
                    {/*/>*/}
                    <Button className={classes.addOnButtons}
                      onClick={() => handleRemoveOne(addOn)}
                      disabled={addOn.quantity === 0}
                    >
                      <RemoveCircle/>
                    </Button>
                    <Typography className={classes.addOnName}>
                        {addOn.name}
                    </Typography>
                    <Typography className={classes.addOnPrice}>
                      {' $'}
                      {addOn.price}{' '}
                    </Typography>
                    <Button className={classes.addOnButtons}
                      onClick={() => handleAddOne(addOn)}
                    >
                        <AddCircle/>
                    </Button>
                  </div>
                </div>
              </Badge>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConfigureAddOns;
