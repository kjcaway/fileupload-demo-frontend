import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from "react-redux";

/**
 * 프로그레스바 컴포넌트
 * 
 * @param {Object} props 
 */
function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function ProgressBar() {
  const classes = useStyles();
  const isProgressShow = useSelector((store) => store.progress.isShow);
  const progressPercentage = useSelector((store) => store.progress.percentage);

  return (
    <React.Fragment>
      {isProgressShow && 
        <div className={classes.root}>
          <LinearProgressWithLabel value={progressPercentage} />
        </div>
      }
    </React.Fragment>
  )
}

export default ProgressBar
