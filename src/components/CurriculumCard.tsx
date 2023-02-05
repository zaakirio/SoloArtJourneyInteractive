import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { Course } from "../interfaces/Curriculum";
import { CardMedia, CircularProgress, Divider, Grid, IconButton, Slider, Tooltip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
const Curriculum: React.FC<Course> = ({ title, body, term }) => {
  const [liked, setLiked] = useState(false);
  return (
        <Card sx={{
          width: {
            sx: 1.0, // 100%
            sm: 250,
            md: 350,
          },
        }} style={{ margin: "25px", border: "solid 2px", boxShadow: "13px 10px" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Term {term}
            </Typography>
            <Typography variant="h6" style={{}}>
              {title}
            </Typography>
            <Typography color="text.secondary" style={{ paddingLeft: "0px", paddingBottom: "5px" }}>
              Track Progress
            </Typography>

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