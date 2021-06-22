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
    position: 'absolute',
    zIndex: -2,
    minHeight: '80mm',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
  },
  tableDisplay: {
    width: '100%',
    textAlign: 'center',
    fontSize: '14px',
  },
  header: {
    fontSize: '200px',
    textAlign: 'center',
  },
  tableBody: {
    textAlign: 'left',
  },
});

class NumberTicket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <table className={classes.tableDisplay}>
          <thead>
          <tr>
            <td colSpan={2} className={classes.header}>
              <div className={classes.number}>
                {this.props.number}
              </div>
            </td>
          </tr>
          </thead>
        </table>
      </div>
    );
  }
}

// HigherOrderComponentUsageExample.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(NumberTicket);
