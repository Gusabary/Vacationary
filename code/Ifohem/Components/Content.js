import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link'

const styles = theme => ({
    avatar: {
        marginTop: theme.spacing.unit * 6,
        marginLeft: theme.spacing.unit * 44,
    },
    name: {
        marginLeft: theme.spacing.unit * 6,
        paddingTop: theme.spacing.unit * 6,
    },
    date: {
        marginTop: theme.spacing.unit * 2.5,
        marginLeft: theme.spacing.unit * 44,
        fontSize: 12,
        color: theme.palette.secondary.dark,
    },
    place: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 44,
    },
    intro: {
        marginTop: theme.spacing.unit * 0.5,
        marginLeft: theme.spacing.unit * 44,
        fontSize: 12,
    },
})

function Content(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <Toolbar>
                <Avatar alt="Remy Sharp" className={classes.avatar}>
                    tbc
                </Avatar>
                <Typography variant="h5" className={classes.name}>
                    Tao Bocheng
                </Typography>
            </Toolbar>
            <Typography className={classes.date}>
                2019.2.9, 1:58 p.m.
            </Typography>
            <Typography className={classes.place}>
                <Link href="#">上海交通大学闵行校区！</Link>
            </Typography>
            <Typography className={classes.intro}>
                带你的同学一起去上海交通大学闵行校区！
            </Typography>
            <Typography className={classes.intro}>
                Read more..
            </Typography>
        </React.Fragment>
    );
}

export default withStyles(styles)(Content);