import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { Course } from "../interfaces/Curriculum";
import { CardMedia, Checkbox, CircularProgress, Divider, FormControlLabel, FormGroup, Grid, IconButton, Slider, Tooltip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DoneIcon from '@mui/icons-material/Done';

//TODO 
// 1) Make layout of cards responsive, 3 cards per row
// 2) Trigger circle progress bar by using Track Progress checkbox

const Curriculum: React.FC<Course> = ({ title, body, term }) => {
  return (
    <Card style={{ margin: "25px", border: "solid 2px", boxShadow: "13px 10px", width: "400px" }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography sx={{ fontSize: 14, }} color="text.secondary" gutterBottom>
              Term {term}
            </Typography>
            <Typography variant="subtitle1" style={{ fontWeight: "600" }}>
              {title}
            </Typography>
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
            <Typography color="text.secondary" style={{}}>
            </Typography>

          </Grid>

        </Grid>

        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value={Math.floor(Math.random() * 100)} style={{ color: "maroon" }} />
          <Box
            sx={{
              top: 0,
              left: 0,
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
              color="text.secondary"
            >{`${Math.floor(Math.random() * 100)}%`}</Typography>
          </Box>
        </Box>
      </CardContent>
      <Grid style={{ paddingLeft: "6px" }}>
        <Typography color="text.secondary" style={{ paddingLeft: "10px" }}>
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
    </Card>

  )

}

export default Curriculum;