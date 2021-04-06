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
    width: '48mm',
    marginLeft: '5mm',
    minHeight: '50vh',
    backgroundColor: 'white',
    paddingTop: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  tableDisplay: {
    width: '100%',
    textAlign: 'center',
    fontSize: '12px',
  },
  header: {
    fontSize: '14px',
  },
  tableBody: {
    textAlign: 'left',
  },
  itemCol: {
    width: '36mm',
  },
  priceCol: {
    textAlign: 'right',
    width: '12mm',
    verticalAlign: 'top',
  },
  companyName: {
    marginBottom: '10px',
  },
  subheading: {
    fontSize: '12px',
    marginTop: '5px',
  },
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
    if (this.props.baseService) {
      subtotal += Number(this.props.baseService.price);
    }

    this.props.addOns.forEach(addon => {
      subtotal += Number(addon.price);
    });

    const hst = subtotal * HST;

    const total = subtotal + hst;

    return (
      <div className={classes.root}>
        <table className={classes.tableDisplay}>
          <thead>
            <tr>
              <td colSpan={2} className={classes.header}>
                <div className={classes.companyName}>
                  {COMPANY_NAME}
                  <div>{this.state.time.format('MM/DD/YYYY')}</div>
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
                {this.props.baseService ? "$" + this.props.baseService.price.toFixed(2) : ''}
              </td>
            </tr>
            {this.props.baseService && <Typography className={classes.subheading}>Includes </Typography>}
            <tr>
              {this.props.baseService && this.props.baseService.includes.map((included, index) => (
                <tr key={index}>
                  <td className={classes.itemCol}>-{included.name}</td>
                  <td className={classes.priceCol}> </td>
                </tr>
              ))}
            </tr>
            {this.props.addOns.length > 0 && <Typography className={classes.subheading}>Add Ons </Typography>}
            {this.props.addOns.map((addon, index) => (
              <tr key={index}>
                <td className={classes.itemCol}>+{addon.name}</td>
                <td className={classes.priceCol}>${addon.price.toFixed(2)}</td>
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
        </table>
      </div>
    );
  }
}

// HigherOrderComponentUsageExample.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ReceiptDisplay);
