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

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DoneIcon from '@mui/icons-material/Done';

const Curriculum: React.FC<Course> = ({ title, body, term }) => {
  return (
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
                    <Box sx={{ position: 'relative', display: 'inline-flex',paddingTop: '25px' }}>
          <CircularProgress variant="determinate" value={Math.floor(Math.random() * 100)} style={{ color: "maroon" ,paddingLeft:"20px"}} size="4.5rem"/>
          <Box
            sx={{
              top: 10,
              left: 5,
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
              style={{fontSize:"20px"}}
            >{`${Math.floor(Math.random() * 100)}`}</Typography>
          </Box>
        </Box>
          </Grid>

          <Grid item>
            <Typography color="text.secondary" style={{}}>
              Track Progress
            </Typography>

            <Tooltip arrow title="Started" componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'common.black',
                  '& .MuiTooltip-arrow': {
                    color: 'common.black',
                  },
                },
              }
            }}>
              <Checkbox style={{ color: "green" }} icon={<DoneOutlineIcon />} checkedIcon={<DoneIcon />} />
            </Tooltip>
            <Tooltip arrow title="Engaged with resources" componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'common.black',
                  '& .MuiTooltip-arrow': {
                    color: 'common.black',
                  },
                },
              }
            }}>
              <Checkbox style={{ color: "green" }} icon={<DoneOutlineIcon />} checkedIcon={<DoneIcon />} />
            </Tooltip>
            <Tooltip arrow title="Practiced Technique" componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'common.black',
                  '& .MuiTooltip-arrow': {
                    color: 'common.black',
                  },
                },
              }
            }}>
              <Checkbox style={{ color: "green" }} icon={<DoneOutlineIcon />} checkedIcon={<DoneIcon />} />
            </Tooltip>
            <Tooltip arrow title="Finish Challenge" componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: 'common.black',
                  '& .MuiTooltip-arrow': {
                    color: 'common.black',
                  },
                },
              }
            }}>
              <Checkbox style={{ color: "brown" }} icon={<FlagOutlinedIcon />} checkedIcon={<FlagIcon />} />
            </Tooltip>

        <Typography color="text.secondary" style={{paddingTop:"10px"}}>
          Resources
        </Typography>
        <Tooltip title={body[0].video.title} arrow={true}>
          <IconButton href={body[0].video.url} target={"_blank"}>
            <PlayCircleOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={body[0].reading.title} arrow={true} >
          <IconButton href={body[0].reading.url} target={"_blank"}>
            <AutoStoriesIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={body[0].challenge.title}>
          <IconButton href={body[0].challenge.url} target={"_blank"}>
            <TrendingUpIcon />
          </IconButton>
        </Tooltip>
          </Grid>

        </Grid>


      </CardContent>

    </Card>
  )
}

export default Curriculum;