import React, { useState } from "react";
import Curriculum from "./components/CurriculumCard";
import { Course } from './interfaces/Curriculum';
import curriculumjson from './assets/curriculum.json'
import { ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import DarkModeIcon from '@mui/icons-material/DarkMode';

const App: React.FC = () => {

  let courses: Course[] = JSON.parse(JSON.stringify(curriculumjson));
  return (
    <div style={{backgroundColor:"beige" ,width:"100vw",height:"100vh"}}>
        {courses.map(course =>
          <Curriculum title={course.title} body={course.body} term={course.term} />
        )
        }
        </div>
  );
};

export default App;