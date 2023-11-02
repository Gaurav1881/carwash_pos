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
import { Card, Fade, Modal, Typography } from '@material-ui/core';
import PinInput from 'react-pin-input';

import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { ADMIN_PIN } from '../../constants';

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
        backgroundColor: 'white',
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
    logTable: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        height: '100%',
        width: '1000px',
        margin: '10px',
        padding: '20px',
    },
    quickData: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        height: '150px',
        width: '300px',
        margin: '10px',
        padding: '20px',
    },
    boldNumber: {
        fontSize: '70px',
        fontWeight: 'bold',
    },
    flexBox: {
        display: 'flex',
    },
    flexRow: {
        display: 'flex',
        width: "100%",
        justifyContent: 'space-between',
    },
    flaggedRow: {
        backgroundColor: '#ffcccc',
    },
}));

const key = 'DashboardPage';

function DashboardPage(props) {
    useInjectReducer({ key, reducer })

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(true);
    const [pin, setPin] = React.useState();
    const [tableIndex, setTableIndex] = React.useState(6);

    if (props.logs.length == 0) {
        props.getLogs();
    }

    function compareLogs(a, b) {
        if (!a.date && !b.date) {
            return 0;
        }
        if (!a.date && b.date) {
            return 1
        }
        if (a.date && !b.date) {
            return -1;
        }

        const a_date = new Date(a.date).getTime();
        const b_date = new Date(b.date).getTime();

        if (a_date - b_date > 0) {
            return -1;
        }
        if (b_date - a_date > 0) {
            return 1;
        }
        return 0;
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

    const compareForFlag = (rowa, rowb) => {
        if (rowa.date && rowb.date) {
            const rowatime = new Date(rowa.date).getTime();
            const rowbtime = new Date(rowb.date).getTime();

            return (rowatime - rowbtime < 180000);
        }
        return false;
    }

    const renderDataTable = () => {
        if (props.logs.length == 0) return;

        let rows = props.logs[tableIndex].logs;

        rows.sort(compareLogs);

        rows = rows.map((row, index) => {
            if (index + 1 < rows.length) {
                return {
                    ...row,
                    flagged: compareForFlag(row, rows[index + 1])
                }
            } else {
                return {
                    ...row,
                    flagged: false
                }
            }
        });

        const getDateTime = (datetime) => {
            const d = new Date(datetime);
            return d.toLocaleString();
        }

        return <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"> Date </TableCell>
                        <TableCell align="left">Wash Name</TableCell>
                        <TableCell align="left">Wash Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow
                            key={i}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 }
                            }}
                            className={row.flagged ? classes.flaggedRow : ''}
                        >
                            <TableCell component="th" scope="row" align="left">
                                {row.date ? getDateTime(row.date) : ''} {row.flagged}
                            </TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    }

    const renderFrequencyTable = () => {
        if (props.logs.length == 0) return;

        let set = {};

        props.logs[tableIndex].logs.forEach(log => {
            let n = log.name;
            if (n in set) {
                set[n] = set[n] + 1
            } else {
                set[n] = 1
            }
        })

        return <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"> Wash Type </TableCell>
                        <TableCell align="left">Wash Frequency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(set).map((r, i) => (
                        <TableRow
                            key={i}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 }
                            }}
                        >
                            <TableCell align="left">{r[0]}</TableCell>
                            <TableCell align="left">{r[1]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

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

    const getRevenueToday = () => {
        let sum = 0
        if (props.logs.length > 0) {
            const todays_logs = props.logs[6].logs
            todays_logs.forEach(log => {
                sum += log.price
            })
        }
        return sum;
    }

    const handleSetPin = (value) => {
        setPin(value);
        if (value == ADMIN_PIN) {
            setModalOpen(false);
        }
    }

    return (
        <Grid className={classes.dashboardPanal}>
            <div className={classes.flexBox}>
                <Card className={classes.quickData}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" align='center' gutterBottom>
                        Cars Washed Today
                    </Typography>
                    <Typography className={classes.boldNumber} color="text.secondary" align='center' gutterBottom>
                        {getCarsWashedToday()}
                    </Typography>
                </Card>
                <Card className={classes.quickData}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" align='center' gutterBottom>
                        Estimate Pre-tax Revenue
                    </Typography>
                    <Typography className={classes.boldNumber} color="text.secondary" align='center' gutterBottom>
                        ${getRevenueToday()}
                    </Typography>
                </Card>
            </div>
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
            <div className={classes.flexBox}>
                {
                    props.logs.length > 0 && (
                        <Card className={classes.logTable}>
                            <div className={classes.flexRow}>
                                <Button variant="contained" disabled={tableIndex == 0 ? true : false} onClick={() => setTableIndex(tableIndex - 1)}> Previous Day </Button>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" align='center' gutterBottom>
                                    {props.logs[tableIndex].date} Daily Logs
                                </Typography>
                                <Button variant="contained" disabled={tableIndex == 6 ? true : false} onClick={() => setTableIndex(tableIndex + 1)}> Next Day </Button>
                            </div>
                            {renderDataTable()}
                        </Card>
                    )
                }
            </div>
            <div className={classes.flexBox}>
                {
                    props.logs.length > 0 && (
                        <Card className={classes.logTable}>
                            <div className={classes.flexRow}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" align='center' gutterBottom>
                                    {props.logs[tableIndex].date} Wash Frequency
                                </Typography>
                            </div>
                            {renderFrequencyTable()}
                        </Card>
                    )
                }
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modalOpen}
                // onClose={onCloseModal}
                closeAfterTransition
                // BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <div className={classes.paper}>
                        <PinInput
                            length={7}
                            initialValue=""
                            secret
                            type="numeric"
                            inputMode="number"
                            style={{ padding: '10px' }}
                            inputStyle={{ borderColor: '#bdbdbd', borderRadius: '5px' }}
                            inputFocusStyle={{ borderColor: '#4e4e4e' }}
                            onChange={(value, index) => {
                                handleSetPin(value);
                            }}
                            autoSelect
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        />
                    </div>
                </Fade>
            </Modal>
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
