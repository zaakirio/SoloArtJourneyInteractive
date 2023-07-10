import React from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CoursesSection = () => {
  const coursesData = [
    {
      term: 1,
      curriculum: ['Course 1A', 'Course 1B', 'Course 1C'],
    },
    {
      term: 2,
      curriculum: ['Course 2A', 'Course 2B', 'Course 2C'],
    },
    {
      term: 3,
      curriculum: ['Course 3A', 'Course 3B', 'Course 3C'],
    },
    {
      term: 4,
      curriculum: ['Course 4A', 'Course 4B', 'Course 4C'],
    },
  ];

  return (
    <Grid container spacing={2} padding={5} >
      {coursesData.map((course) => (
        <Grid key={course.term} item xs={6} md={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Term {course.term}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {course.curriculum.map((curriculumItem, index) => (
                  <li key={index}>{curriculumItem}</li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};

export default CoursesSection;
