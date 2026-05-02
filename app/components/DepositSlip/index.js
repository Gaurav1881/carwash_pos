/* eslint-disable react/prop-types */
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import { COMPANY_NAME } from '../../constants';

const styles = () => ({
  root: {
    width: '65mm',
    marginLeft: '0mm',
    minHeight: '70vh',
    backgroundColor: 'white',
    paddingTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  tableDisplay: {
    width: '100%',
    textAlign: 'center',
    fontSize: '14px',
  },
  header: {
    fontSize: '12px',
    textAlign: 'center',
  },
  companyName: {
    marginBottom: '10px',
  },
  itemCol: {
    width: '38mm',
    textAlign: 'left',
  },
  priceCol: {
    textAlign: 'right',
    width: '14mm',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '8px 0',
  },
  dashedHr: {
    marginTop: '10px',
    borderTop: '1px dashed black',
  },
  sectionTwoHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: '15px',
    fontSize: '11px',
    textAlign: 'center',
  },
});

class DepositSlip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: moment() };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.setState({ time: moment() }),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  renderCopy(label) {
    const { classes, amount = 50 } = this.props;
    return (
      <tbody>
        {label && (
          <tr>
            <td colSpan={2} className={classes.sectionTwoHeader}>
              {label}
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={2} className={classes.header}>
            <div className={classes.companyName}>
              {COMPANY_NAME}
              <div>{this.state.time.format('MM/DD/YYYY hh:mm:ss A')}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} className={classes.title}>
            DEPOSIT RECEIVED
          </td>
        </tr>
        <tr>
          <td className={classes.itemCol}>Deposit Amount</td>
          <td className={classes.priceCol}>${Number(amount).toFixed(2)}</td>
        </tr>
        <tr>
          <td className={classes.itemCol}>Paid</td>
          <td className={classes.priceCol}>Cash</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <hr />
          </td>
        </tr>
        <tr>
          <td colSpan={2} className={classes.footer}>
            Applied toward detailing service.
            <br />
            Balance due at time of service.
            <br />
            Non-refundable unless otherwise agreed.
          </td>
        </tr>
        <tr>
          <td colSpan={2} className={classes.footer}>
            Customer Name: ______________________
            <br />
            <br />
            Phone: ______________________
          </td>
        </tr>
      </tbody>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <table className={classes.tableDisplay}>
          {this.renderCopy('')}
          <tbody>
            <tr>
              <td colSpan={2}>
                <hr className={classes.dashedHr} />
              </td>
            </tr>
          </tbody>
          {this.renderCopy('STORE COPY')}
        </table>
      </div>
    );
  }
}

export default withStyles(styles)(DepositSlip);
