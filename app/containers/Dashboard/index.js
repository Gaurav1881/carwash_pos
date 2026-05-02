/* eslint-disable react/prop-types, eqeqeq, no-shadow, no-plusplus, camelcase, consistent-return, react/no-array-index-key, operator-assignment */
import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  Label,
} from 'recharts';
import {
  Card,
  Fade,
  Modal,
  Typography,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
import PinInput from 'react-pin-input';
import * as XLSX from 'xlsx';
import { useInjectReducer } from '../../utils/injectReducer';
import { selectLogs } from './selectors';
import { getServiceLogs } from './actions';
import saga from './saga';
import reducer from './reducer';
import { ADMIN_PIN } from '../../constants';

const withSaga = injectSaga({ key: 'logs', saga, mode: DAEMON });

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
    width: '100%',
    justifyContent: 'space-between',
  },
  flaggedRow: {
    backgroundColor: '#ffcccc',
  },
}));

const key = 'DashboardPage';

function DashboardPage(props) {
  useInjectReducer({ key, reducer });

  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(true);
  const [, setPin] = React.useState();
  const [tableIndex, setTableIndex] = React.useState(6);

  if (props.logs.length == 0) {
    props.getLogs();
  }

  const addOnsTotal = log => {
    if (!log || !Array.isArray(log.addOns)) return 0;
    return log.addOns.reduce(
      (s, a) => s + Number(a.price || 0) * Number(a.quantity || 0),
      0,
    );
  };

  const logTotal = log => {
    if (!log) return 0;
    return Number(log.price || 0) + addOnsTotal(log);
  };

  const formatAddOns = log => {
    if (!log || !Array.isArray(log.addOns)) return '';
    return log.addOns
      .filter(a => Number(a.quantity || 0) > 0)
      .map(a => `${a.quantity}x ${a.name}`)
      .join(', ');
  };

  function compareLogs(a, b) {
    if (!a.date && !b.date) {
      return 0;
    }
    if (!a.date && b.date) {
      return 1;
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
        <YAxis
          label={{
            value: 'number of cars washed',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
      </LineChart>
    );
  };

  const compareForFlag = (rowa, rowb) => {
    if (rowa.date && rowb.date) {
      const rowatime = new Date(rowa.date).getTime();
      const rowbtime = new Date(rowb.date).getTime();

      return rowatime - rowbtime < 180000;
    }
    return false;
  };

  const renderDataTable = () => {
    if (props.logs.length == 0) return;

    let rows = props.logs[tableIndex].logs;

    rows.sort(compareLogs);

    rows = rows.map((row, index) => {
      if (index + 1 < rows.length) {
        return {
          ...row,
          flagged: compareForFlag(row, rows[index + 1]),
        };
      }
      return {
        ...row,
        flagged: false,
      };
    });

    const getDateTime = datetime => {
      const d = new Date(datetime);
      return d.toLocaleString();
    };

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"> Date </TableCell>
              <TableCell align="left">Wash Name</TableCell>
              <TableCell align="left">Wash Price</TableCell>
              <TableCell align="left">Add-Ons</TableCell>
              <TableCell align="left">Add-Ons Total</TableCell>
              <TableCell align="left">Payment</TableCell>
              <TableCell align="left">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
                className={row.flagged ? classes.flaggedRow : ''}
              >
                <TableCell component="th" scope="row" align="left">
                  {row.date ? getDateTime(row.date) : ''} {row.flagged}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  {Number(row.price || 0).toFixed(2)}
                </TableCell>
                <TableCell align="left">{formatAddOns(row)}</TableCell>
                <TableCell align="left">
                  {addOnsTotal(row).toFixed(2)}
                </TableCell>
                <TableCell align="left">{row.paymentMethod || '-'}</TableCell>
                <TableCell align="left">{logTotal(row).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderFrequencyTable = () => {
    if (props.logs.length == 0) return;

    const set = {};

    props.logs[tableIndex].logs.forEach(log => {
      const n = log.name;
      if (n in set) {
        set[n] = set[n] + 1;
      } else {
        set[n] = 1;
      }
    });

    return (
      <TableContainer component={Paper}>
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
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell align="left">{r[0]}</TableCell>
                <TableCell align="left">{r[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderWeeklyProfitChart = () => {
    const dataPoints = [];

    props.logs.forEach(log => {
      let totalSales = 0;
      log.logs.forEach(service => {
        totalSales += logTotal(service);
      });
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
        <YAxis
          label={{ value: 'sales pre tax', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Area type="monotone" dataKey="sales" stroke="#82ca9d" />
      </AreaChart>
    );
  };

  const getCarsWashedToday = () => {
    if (props.logs.length > 0) {
      return props.logs[6].logs.length;
    }
    return 0;
  };

  const getRevenueToday = () => {
    let sum = 0;
    if (props.logs.length > 0) {
      const todays_logs = props.logs[6].logs;
      todays_logs.forEach(log => {
        sum += logTotal(log);
      });
    }
    return sum.toFixed(2);
  };

  const downloadExcel = () => {
    if (props.logs.length === 0) return;
    const dayEntry = props.logs[tableIndex];
    const dayLogs = (dayEntry && dayEntry.logs) || [];
    const dateStr = (dayEntry && dayEntry.date) || 'unknown';

    const rowSection = [
      [
        'Time',
        'Service',
        'Base Price',
        'Add-Ons',
        'Add-Ons Total',
        'Payment',
        'Row Total',
      ],
    ];
    let grandBase = 0;
    let grandAddOns = 0;
    const aggregation = {};

    dayLogs.forEach(log => {
      const base = Number(log.price || 0);
      const adds = addOnsTotal(log);
      const name = log.name || 'Unknown';
      const time = log.date ? new Date(log.date).toLocaleString() : '';
      rowSection.push([
        time,
        name,
        base,
        formatAddOns(log),
        adds,
        log.paymentMethod || '-',
        base + adds,
      ]);
      grandBase += base;
      grandAddOns += adds;
      if (!aggregation[name]) {
        aggregation[name] = { count: 0, baseRevenue: 0, addOnRevenue: 0 };
      }
      aggregation[name].count += 1;
      aggregation[name].baseRevenue += base;
      aggregation[name].addOnRevenue += adds;
    });

    const aoa = [];
    aoa.push(['Royal Carwash — Daily Breakdown']);
    aoa.push(['Date', dateStr]);
    aoa.push([]);
    aoa.push(['Services']);
    rowSection.forEach(r => aoa.push(r));
    aoa.push([]);
    aoa.push(['Aggregation by Wash Type']);
    aoa.push([
      'Wash Type',
      'Count',
      'Base Revenue',
      'Add-On Revenue',
      'Subtotal',
    ]);
    Object.keys(aggregation).forEach(wash => {
      const a = aggregation[wash];
      aoa.push([
        wash,
        a.count,
        a.baseRevenue,
        a.addOnRevenue,
        a.baseRevenue + a.addOnRevenue,
      ]);
    });
    aoa.push([]);
    aoa.push(['Grand Total']);
    aoa.push(['Total Services', dayLogs.length]);
    aoa.push(['Total Base Revenue', grandBase]);
    aoa.push(['Total Add-On Revenue', grandAddOns]);
    aoa.push(['Grand Total', grandBase + grandAddOns]);

    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Daily Breakdown');
    XLSX.writeFile(wb, `royal-carwash-logs-${dateStr}.xlsx`);
  };

  const handleSetPin = value => {
    setPin(value);
    if (value == ADMIN_PIN) {
      setModalOpen(false);
    }
  };

  return (
    <Grid className={classes.dashboardPanal}>
      <div className={classes.flexBox}>
        <Card className={classes.quickData}>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Cars Washed Today
          </Typography>
          <Typography
            className={classes.boldNumber}
            color="text.secondary"
            align="center"
            gutterBottom
          >
            {getCarsWashedToday()}
          </Typography>
        </Card>
        <Card className={classes.quickData}>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Estimate Pre-tax Revenue
          </Typography>
          <Typography
            className={classes.boldNumber}
            color="text.secondary"
            align="center"
            gutterBottom
          >
            ${getRevenueToday()}
          </Typography>
        </Card>
      </div>
      <div className={classes.flexBox}>
        <Card className={classes.graphCard}>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Cars Washed
          </Typography>
          {renderWeeklyCountChart()}
        </Card>
        <Card className={classes.graphCard}>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Pre-Tax Sales
          </Typography>
          {renderWeeklyProfitChart()}
        </Card>
      </div>
      <div className={classes.flexBox}>
        {props.logs.length > 0 && (
          <Card className={classes.logTable}>
            <div className={classes.flexRow}>
              <Button
                variant="contained"
                disabled={tableIndex == 0}
                onClick={() => setTableIndex(tableIndex - 1)}
              >
                {' '}
                Previous Day{' '}
              </Button>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                align="center"
                gutterBottom
              >
                {props.logs[tableIndex].date} Daily Logs
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={downloadExcel}
              >
                {' '}
                Download Excel{' '}
              </Button>
              <Button
                variant="contained"
                disabled={tableIndex == 6}
                onClick={() => setTableIndex(tableIndex + 1)}
              >
                {' '}
                Next Day{' '}
              </Button>
            </div>
            {renderDataTable()}
          </Card>
        )}
      </div>
      <div className={classes.flexBox}>
        {props.logs.length > 0 && (
          <Card className={classes.logTable}>
            <div className={classes.flexRow}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                align="center"
                gutterBottom
              >
                {props.logs[tableIndex].date} Wash Frequency
              </Typography>
            </div>
            {renderFrequencyTable()}
          </Card>
        )}
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
              onChange={value => {
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
  withSaga,
)(DashboardPage);
