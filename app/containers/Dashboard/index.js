import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Grid from '@material-ui/core/Grid';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import reducer from './reducer';
import { useInjectReducer } from '../../utils/injectReducer';
import { selectLogs } from './selectors';
import { getServiceLogs } from './actions';

import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import saga from './saga';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, Label } from 'recharts';
import { Card, Typography } from '@material-ui/core';


const withSaga = injectSaga({ key: 'logs', saga, mode: DAEMON });

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
    dashboardPanal: {
        minHeight: '100vh',
        backgroundColor: '#383c5f',
        display: 'flex',
        padding: '20px',
        flexDirection: 'column',
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
        height: '100vh',
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
    numberTicketButton: {
        width: '80px',
        height: '60px',
        backgroundColor: '#383c5f',
        color: 'white',
        fontSize: '20px',
        marginLeft: '50px',
    },
    settingsButton: {
        alignSelf: 'bottom',
        marginLeft: '20px',
    },
    numberTicketButtonFirst: {
        width: '60px',
        height: '60px',
        backgroundColor: '#383c5f',
        color: 'white',
        fontSize: '24px',
        marginLeft: '10px',
    },
    numberTicketWrapper: {
        padding: '20px 20px 20px 20px',
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    graphCard: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        height: '320px',
        width: '520px',
        margin: '10px',
        padding: '20px',
    },
    quickData: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        height: '150px',
        width: '250px',
        margin: '10px',
        padding: '20px',
    },
    boldNumber: {
        fontSize: '70px',
        fontWeight: 'bold',
    },
    flexBox: {
        display: 'flex',
    }
}));

const key = 'DashboardPage';

function DashboardPage(props) {
    useInjectReducer({ key, reducer })

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [pin, setPin] = React.useState();

    if (props.logs.length == 0) {
        props.getLogs();
    }

    const renderWeeklyCountChart = () => {
        const dataPoints = [];

        props.logs.forEach(log => {
            dataPoints.push({
                name: log.date,
                count: log.logs.length,
            });
        });

        return (
            <LineChart
                width={450}
                height={250}
                data={dataPoints}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label value="Date" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis label={{ value: 'number of cars washed', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
        );
    }

    const renderWeeklyProfitChart = () => {
        const dataPoints = [];

        props.logs.forEach(log => {
            let totalSales = 0;
            log.logs.forEach(service => {
                totalSales += service.price
            })
            dataPoints.push({
                name: log.date,
                sales: totalSales,
            });
        });

        return (
            <AreaChart
                width={450}
                height={250}
                data={dataPoints}
                margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name">
                    <Label value="Date" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis label={{ value: 'sales pre tax', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#82ca9d" />
            </AreaChart>
        );
    }

    const getCarsWashedToday = () => {
        if (props.logs.length > 0) {
            return props.logs[6].logs.length
        }
        return 0;
    }

    return (
        <Grid className={classes.dashboardPanal}>
            <Card className={classes.quickData}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" align='center' gutterBottom>
                    Cars Washed Today
                </Typography>
                <Typography className={classes.boldNumber} color="text.secondary" align='center' gutterBottom>
                    {getCarsWashedToday()}
                </Typography>
            </Card>
            <div className={classes.flexBox}>
                <Card className={classes.graphCard}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" align='center' gutterBottom>
                        Cars Washed
                    </Typography>
                    {renderWeeklyCountChart()}
                </Card>
                <Card className={classes.graphCard}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" align='center' gutterBottom>
                        Pre-Tax Sales
                    </Typography>
                    {renderWeeklyProfitChart()}
                </Card>
            </div>
        </Grid>
    );
}

const mapStateToProps = createStructuredSelector({
    logs: selectLogs(),
});

export function mapDispatchToProps(dispatch) {
    return {
        getLogs: () => {
            dispatch(getServiceLogs());
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
    withSaga
)(DashboardPage);
