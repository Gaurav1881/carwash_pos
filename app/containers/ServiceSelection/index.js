import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import ReactToPrint from 'react-to-print';
import DisplayServices from '../../components/DisplayServices';
import ConfigureAddOns from '../../components/ConfigureAddOns';

import reducer from './reducer';
import { useInjectReducer } from '../../utils/injectReducer';
import { selectBaseService, selectAddOns } from './selectors';
import { addAddOn, removeAddOn, resetAll, setBaseService } from './actions';
import ReceiptDisplay from '../../components/ReceiptDisplay';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
  selectionPanel: {
    minHeight: '100vh',
    backgroundColor: '#383c5f',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  rightPane: {
    textAlign: 'center',
  },
  receiptWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiptHeader: {
    margin: '15px',
    fontSize: '20px',
    textAlign: 'center',
  },
  printButton: {
    width: '49mm',
    marginTop: '40px',
  },
  buttonWrapper: {
    marginTop: '20px',
    width: '100%',
    textAlign: 'center',
  },
}));

function getSteps() {
  return ['Select your base service', 'Select your add-ons'];
}

const key = 'ServiceSelectionPage';

function ServiceSelectionPage(props) {
  const componentRef = useRef();

  useInjectReducer({ key, reducer });

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    props.onClickResetAll(null);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleServiceSelection = service => {
    setActiveStep(1);
    props.onClickSetBaseService(service);
  };

  const handleAfterPrint = () => {
    setActiveStep(0);
    props.onClickResetAll(null);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <DisplayServices
            onSelectService={service => handleServiceSelection(service)}
          />
        );
      case 1:
        return (
          <ConfigureAddOns
            baseService={props.baseService}
            addOns={props.addOns}
            onClickAddAddOn={props.onClickAddAddOn}
            onClickRemoveAddOn={props.onClickRemoveAddOn}
          />
        );
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown step';
    }
  }

  return (
    <Grid container direction="row">
      <Grid item xs={10} className={classes.selectionPanel}>
        <div>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div className={classes.buttonWrapper}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Grid>
      <Grid item xs={2} className={classes.rightPane}>
        <Typography className={classes.receiptHeader}>
          {' '}
          Receipt View{' '}
        </Typography>
        <div className={classes.receiptWrapper}>
          <ReceiptDisplay
            baseService={props.baseService}
            addOns={props.addOns}
            ref={componentRef}
          />
        </div>
        <ReactToPrint
          trigger={() => (
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            <Button
              variant="contained"
              color="primary"
              className={classes.printButton}
              disabled={!props.baseService}
            >
              Print
            </Button>
          )}
          content={() => componentRef.current}
          onAfterPrint={() => handleAfterPrint()}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = createStructuredSelector({
  baseService: selectBaseService(),
  addOns: selectAddOns(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onClickSetBaseService: service => {
      dispatch(setBaseService(service));
    },
    onClickResetAll: () => {
      dispatch(resetAll());
    },
    onClickAddAddOn: payload => {
      dispatch(addAddOn(payload));
    },
    onClickRemoveAddOn: payload => {
      dispatch(removeAddOn(payload));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ServiceSelectionPage);
