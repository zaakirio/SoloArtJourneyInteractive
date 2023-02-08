import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { Course } from "../interfaces/Curriculum";
import { Checkbox, CircularProgress, Grid, IconButton, Tooltip } from '@mui/material';
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

  const celebrate = () => {
    return currentSum === 100 ? <ConfettiExplosion duration={2100}  particleSize={17}/> : <></>
  }

  return (
                <><div>
      {celebrate()}
    </div><div>

        <Card style={{ margin: "25px", border: "solid 2px", boxShadow: "13px 10px", width: "400px", height: "250px" }}>
          <CardContent>
            <Grid container>
              <Grid item xs>
                Term {term}
                <div style={{ fontWeight: "600", fontSize: "20px" }}>
                  {title}
                </div>
                <Box sx={{ position: 'relative', display: 'inline-flex', paddingTop: '25px' }}>
                  <CircularProgress variant="determinate" value={progress} style={{ color: "maroon", paddingLeft: "20px" }} size="4.5rem" />
                  <Box
                    sx={{
                      top: 10,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{ fontSize: "20px" }}
                    >{progress}</div>
                  </Box>
                </Box>
              </Grid>

              <Grid item>
                <div style={{ fontSize: "17px" }}>
                  Track Progress
                </div>
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
                <div style={{ paddingTop: "10px", fontSize: "17px" }}>
                  Resources
                </div>
                <Tooltip title={body[0].video.title} componentsProps={blackArrowStyle} arrow={true}>
                  <IconButton href={body[0].video.url} target={"_blank"}>
                    <PlayCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={body[0].reading.title} componentsProps={blackArrowStyle} arrow={true}>
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
        </Card>

      </div></>
  )
}

export default Curriculum;