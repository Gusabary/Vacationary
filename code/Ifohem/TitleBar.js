import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = ({
    bar: {
        backgroundColor: "#ce93d8",
    },
    title: {
        paddingTop: 120,
        paddingLeft: 500,
        paddingBotton: 350,
        //backgroundColor: red[500],
        //color: red[50],
        //align: "center",
    },
    subtitle: {
        paddingTop: 20,
        paddingLeft: 502,
        paddingBotton: 200,
    },
    padding: {
        paddingTop: 50,
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