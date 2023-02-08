import React, { useState } from "react";
import Curriculum from "./components/CurriculumCard";
import { Course } from './interfaces/Curriculum';
import curriculumjson from './assets/curriculum.json'
import { Grid, Typography } from '@material-ui/core'

const App: React.FC = () => {

  let courses: Course[] = JSON.parse(JSON.stringify(curriculumjson));
  return (

    <Grid
      alignItems="center"
      style={{
        backgroundColor: "beige",
        height: "100vh"
      }}
      alignContent="center"
      justifyContent="center"
    >
      <Grid style={{ margin: 20 }}>
        <h1>
          <strong>Solo Artist Journey Tracker </strong>
        </h1>

      </Grid>
      <Grid style={{ margin: 20 }}>
        <div style={{fontSize:"18px"}}>After being inspired by RadioRunner and Brendan Meachen, I have decided to create an interactive version of the curriculum to track my journey </div>
      </Grid>
                  <div className="CardPickerContainer">
      <Grid container spacing={0}>
      {courses.map(course =>
        <Curriculum title={course.title} body={course.body} term={course.term} />
      )
      }
      </Grid>
      </div>
    </Grid>
  );
};

export default App;