import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face'

const styles = ({
    summary: {
        marginTop: -20,
        backgroundColor: "#ba68c8",
    },
    details: {
        paddingTop: 20,
        backgroundColor: "#ce93d8",
    },
    chip: {
        marginLeft: 20,
        backgroundColor: "#e1bee7",
    },
})

function TitleBar(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <ExpansionPanel>
                <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                        Choose a tag
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <Typography>
                        <Chip
                            icon={<FaceIcon />}
                            label="A"
                            className={classes.chip}
                            clickable
                        />
                        <Chip
                            icon={<FaceIcon />}
                            label="B"
                            className={classes.chip}
                            clickable
                        />
                        <Chip
                            icon={<FaceIcon />}
                            label="C"
                            className={classes.chip}
                            clickable
                        />
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </React.Fragment>
    );
}

export default withStyles(styles)(TitleBar);