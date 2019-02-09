import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = ({
    avatar: {
        marginLeft: 350,
        marginTop: 50,
    },
    name: {
        marginLeft: 50,
        paddingTop: 46,
    },
    date: {
        marginLeft: 350,
        marginTop: 20,
        fontSize: 12,
        color: "#00e676",
    },
    place: {
        marginLeft: 350,
        marginTop: 7,
    },
    intro: {
        marginLeft: 350,
        marginTop: 5,
        fontSize: 12,
        color: "#757575",
    },
    more: {
        marginLeft: 350,
        marginTop: 5,
        fontSize: 12,
        color: "#757575",
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
                <a href="#">上海交通大学闵行校区！</a>
            </Typography>
            <Typography className={classes.intro}>
                带你的同学一起去上海交通大学闵行校区！
            </Typography>
            <Typography className={classes.more}>
                Read more..
            </Typography>
        </React.Fragment>
    );
}

export default withStyles(styles)(Content);