import React from 'react';
// import './components/CurriculumCard.css';
import './Navbar.css';

import { Button, Grid, Typography } from '@mui/material';

interface NavBarProps {
    onHomeClick: () => void;
    onAboutClick: () => void;
    onSignUpClick: () => void;
    onRegisterClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
    onHomeClick,
    onAboutClick,
    onSignUpClick,
    onRegisterClick,
}) => (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Grid style={{ margin: 20 }}>
        <h1 style={{ color: "black", alignItems: "center" }} >
          <strong className="c">Solo Art Journey Tracker </strong>
        </h1>
      </Grid>

    </nav>
);

export default NavBar;
