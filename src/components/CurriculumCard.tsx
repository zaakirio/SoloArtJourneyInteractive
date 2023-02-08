import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { Course } from "../interfaces/Curriculum";
import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, IconButton, Tooltip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { progressTitles, blackArrowStyle } from '../util/constants';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DoneIcon from '@mui/icons-material/Done';
import ConfettiExplosion from 'react-confetti-explosion';

const Curriculum: React.FC<Course> = ({ title, body, term }) => {
  const [checkedState, setCheckedState] = useState(new Array(4).fill(false));
  const [progress, setProgress] = useState(0);
  const [currentSum, setCurrentSum] = useState(0);
  const [isExploding, setIsExploding] = React.useState(false);
  const handleOnChange = (check: number) => {
    const updatedCheckedState = checkedState.map((item, index: number) =>
      index === check ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalProgress = updatedCheckedState.reduce(
      (sum, currentState) => {
        if (currentState === true) {
          setCurrentSum(sum + 25);
          return sum + 25;
        }
        return sum;
      },
      0
    );

    setProgress(totalProgress);
  };

  return (
    <div>
          { currentSum === 100 ? <ConfettiExplosion/> :
    <Card style={{ margin: "25px", border: "solid 2px", boxShadow: "13px 10px", width: "400px" }}>
      <CardContent>
        <Grid container>
          <Grid item xs>
            <Typography sx={{ fontSize: 14, }} color="text.secondary" gutterBottom>
              Term {term}
            </Typography>
            <Typography style={{ fontWeight: "600", fontSize: "20px" }}>
              {title}
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', paddingTop: '25px' }}>
              <CircularProgress variant="determinate" value={progress} style={{ color: "maroon", paddingLeft: "20px" }} size="4.5rem" />
              <Box
                sx={{
                  top: 10,
                  left: 2.5,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="black"
                  style={{ fontSize: "20px" }}
                >{progress}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item>
            <Typography color="text.secondary">
              Track Progress
            </Typography>
            {progressTitles.map((title, index) => {
              return (
                <Tooltip arrow title={title} componentsProps={blackArrowStyle}>
                  <Checkbox style={{ color: "green" }} icon={<DoneOutlineIcon />} checkedIcon={<DoneIcon />} checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                </Tooltip>
              );
            })}
            <Tooltip arrow title="Finish Challenge" componentsProps={blackArrowStyle}>
              <Checkbox style={{ color: "brown" }} icon={<FlagOutlinedIcon />} checkedIcon={<FlagIcon />} checked={checkedState[3]} onChange={() => handleOnChange(3)} />
            </Tooltip>
            <Typography color="text.secondary" style={{ paddingTop: "10px" }}>
              Resources
            </Typography>
            <Tooltip title={body[0].video.title} componentsProps={blackArrowStyle} arrow={true}>
              <IconButton href={body[0].video.url} target={"_blank"}>
                <PlayCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={body[0].reading.title} componentsProps={blackArrowStyle} arrow={true} >
              <IconButton href={body[0].reading.url} target={"_blank"}>
                <AutoStoriesIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={body[0].challenge.title} componentsProps={blackArrowStyle}>
              <IconButton href={body[0].challenge.url} target={"_blank"}>
                <TrendingUpIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>}
    </div>
  )
}

export default Curriculum;