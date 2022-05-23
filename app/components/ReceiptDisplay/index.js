import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { number } from 'prop-types';
import moment from 'moment';
import { COMPANY_NAME, HST, SERVICES } from '../../constants';

const styles = theme => ({
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
  tableBody: {
    textAlign: 'left',
  },
  includesCol: {
    width: '55mm',
  },
  itemCol: {
    width: '38mm',
  },
  priceCol: {
    textAlign: 'right',
    width: '14mm',
    verticalAlign: 'top',
  },
  companyName: {
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '12px',
    marginTop: '5px',
    fontWeight: '600',
  },
  footer: {
    marginTop: '20px',
    fontWeight: 'bold',
    width: '100%',
  },
  dashedHr: {
    marginTop: '10px',
    borderTop: '1px dashed black',
  },
  sectionTwoHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loyalty: {
    padding: '20px',
  }
});

class ReceiptDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: moment(),
    });
  }

  render() {
    const { classes } = this.props;

    let subtotal = 0;
    let addOnsTotal = 0;

    if (this.props.baseService) {
      subtotal += Number(this.props.baseService.price);
    }

    this.props.addOns.forEach(addon => {
      subtotal += Number(addon.price * addon.quantity);
      addOnsTotal += Number(addon.price * addon.quantity);
    });

    const hst = subtotal * HST;

    const total = subtotal + hst;

    const addOns = this.props.addOns.filter(addOn => addOn.quantity > 0);

    return (
      <div className={classes.root}>
        <table className={classes.tableDisplay}>
          <thead>
            <tr>
              <td colSpan={2} className={classes.header}>
                <div className={classes.companyName}>
                  {COMPANY_NAME}
                  <div>{this.state.time.format('MM/DD/YYYY hh:mm:ss A')}</div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody className={classes.tableBody}>
            <tr>
              <td className={classes.itemCol}>
                {this.props.baseService ? this.props.baseService.name : ''}
              </td>
              <td className={classes.priceCol}>
                {this.props.baseService
                  ? `$${this.props.baseService.price.toFixed(2)}`
                  : ''}
              </td>
            </tr>
            {this.props.baseService && (
              <Typography className={classes.subheading}>Includes </Typography>
            )}
            <tr>
              {this.props.baseService &&
                this.props.baseService.includes.map((included, index) => (
                  <tr key={index}>
                    <td className={classes.includesCol} colSpan={2}>-{included.name}</td>
                  </tr>
                ))}
            </tr>
            {addOns.length > 0 && (
              <Typography className={classes.subheading}>Add Ons </Typography>
            )}
            {addOns.map((addon, index) => (
              <tr key={index}>
                <td className={classes.itemCol}>+ {addon.quantity}x {addon.name}</td>
                <td className={classes.priceCol}>${(addon.price * addon.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}>
                <hr />
              </td>
            </tr>
            <tr>
              <td className={classes.itemCol}>Subtotal</td>
              <td className={classes.priceCol}>${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className={classes.itemCol}>HST</td>
              <td className={classes.priceCol}>${hst.toFixed(2)}</td>
            </tr>
            <tr>
              <td className={classes.itemCol}>Total</td>
              <td className={classes.priceCol}>${total.toFixed(2)}</td>
            </tr>
          </tbody>
          <tbody className={classes.footer}>
            <tr>
              <td colSpan={2}>
                <hr />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                This is not an official receipt!
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                Please show this receipt to the cashier for payment
              </td>
            </tr>
          </tbody>
          <tbody className={classes.loyalty}>
            <tr>
              <td colSpan={2}>
                <hr />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <b>LOYALTY PROGRAM</b>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                If you get 5 car washes within a year then the 6th one is free!
              </td>
            </tr>
          </tbody>
          <tbody className={classes.tableBody}>
          <tr>
            <td colSpan={2}>
              <hr className={classes.dashedHr}/>
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={classes.sectionTwoHeader}>
              STORE COPY
            </td>
          </tr>
          <tr>
            <td colSpan={2} className={classes.header}>
              <div className={classes.companyName}>
                {COMPANY_NAME}
                <div>{this.state.time.format('MM/DD/YYYY hh:mm:ss A')}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td className={classes.itemCol}>
              {this.props.baseService ? this.props.baseService.name : ''}
            </td>
            <td className={classes.priceCol}>
              {this.props.baseService
                ? `$${this.props.baseService.price.toFixed(2)}`
                : ''}
            </td>
          </tr>
          <tr>
            <td className={classes.itemCol}>
              AddOns
            </td>
            <td className={classes.priceCol}>
              ${addOnsTotal.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <hr />
            </td>
          </tr>
          <tr>
            <td className={classes.itemCol}>Subtotal</td>
            <td className={classes.priceCol}>${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td className={classes.itemCol}>HST</td>
            <td className={classes.priceCol}>${hst.toFixed(2)}</td>
          </tr>
          <tr>
            <td className={classes.itemCol}>Total</td>
            <td className={classes.priceCol}>${total.toFixed(2)}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

// HigherOrderComponentUsageExample.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ReceiptDisplay);
