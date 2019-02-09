import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    bar: {
        marginRight: -theme.spacing.unit,
        marginLeft: -theme.spacing.unit,
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        paddingTop: theme.spacing.unit * 15,
        paddingBotton: theme.spacing.unit * 44,
        paddingLeft: theme.spacing.unit * 62,
        fontWeight: 600,
    },
    subtitle: {
        paddingTop: theme.spacing.unit * 2.5,
        paddingBotton: theme.spacing.unit * 25,
        paddingLeft: theme.spacing.unit * 63,
    },
    padding: {
        paddingTop: theme.spacing.unit * 6,
    }
})

function TitleBar(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <div className={classes.bar}>
                <Typography variant="h2" className={classes.title}>
                    Ifohem
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Interface of Hermes
                </Typography>
                <Typography className={classes.padding}>
                </Typography>
            </div>
        </React.Fragment>
    );
}

export default withStyles(styles)(TitleBar);