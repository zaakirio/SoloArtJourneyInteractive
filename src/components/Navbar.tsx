import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Course {
  title: string;
  terms: {
    term: number;
    courses: string[];
  }[];
}

const Navbar = () => {
  // State to manage the dropdown menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (course: Course) => {
    setSelectedCourse(course);
    handleMenuClose();
  };

  const courses: Course[] = [
    {
      title: 'Course 1',
      terms: [
        { term: 1, courses: ['Course A', 'Course B', 'Course C'] },
        { term: 2, courses: ['Course D', 'Course E', 'Course F'] },
        { term: 3, courses: ['Course G', 'Course H', 'Course I'] },
        { term: 4, courses: ['Course J', 'Course K', 'Course L'] },
      ],
    },
    // Add more courses as needed
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="course-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="course-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {courses.map((course) => (
            <MenuItem
              key={course.title}
              onClick={() => handleMenuItemClick(course)}
            >
              {course.title}
            </MenuItem>
          ))}
        </Menu>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Your Logo
        </Typography>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Sign Up</Button>

      </Toolbar>
      {selectedCourse && (
        <div>
          <h2>{selectedCourse.title}</h2>
          {selectedCourse.terms.map((term) => (
            <div key={term.term}>
              <h3>Term {term.term}</h3>
              <ul>
                {term.courses.map((course) => (
                  <li key={course}>{course}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </AppBar>
  );
};

export default Navbar;