import React from "react";
import Curriculum from "./components/CurriculumCard";
import { Course } from './interfaces/Curriculum';
import curriculumjson from './assets/curriculum.json'
import { Card, Grid } from '@material-ui/core'
import mySvg from './assets/background.svg';
import './App.css'
const App: React.FC = () => {

  let courses: Course[] = JSON.parse(JSON.stringify(curriculumjson));

  return (
    <Grid
      alignItems="center"
      style={{
        backgroundImage: mySvg,
        height: "100vh"
      }}
      alignContent="center"
      justifyContent="center"
    >
      <Grid style={{ margin: 20 }}>
        <h1 style={{ color: "black", alignItems: "center" }} >
          <strong className="c">Solo Art Journey Tracker </strong>
        </h1>
      </Grid>
      <Grid style={{ margin: 20 }}>
        <Card style={{ padding: "15px", boxShadow: "13px 10px black", color: "black" }}>
          <div style={{ fontSize: "30px", fontWeight: "bolder" }}>Preface</div>
          <div style={{ fontSize: "20px" }}>Welcome to the Solo Art Journey, a curriculum for the solo artist popularised by Alex Huneycutt</div>
          <div style={{ fontSize: "30px", fontWeight: "bolder" }}></div>
          <div style={{ fontSize: "20px" }}></div>
        </Card>
      </Grid>
      <div className="CardPickerContainer">
        <Grid container spacing={0}>
          {courses.map(course =>
            <Curriculum title={course.title} body={course.body} term={course.term} />
          )
          }
        </Grid>
      </div>
    </Grid >
  );
};

export default App;