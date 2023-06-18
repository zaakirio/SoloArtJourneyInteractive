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
        <div >
            <Button className="btn" onClick={onHomeClick}><h1 className="font-black">Home</h1></Button>
            <Button className="btn" onClick={onAboutClick}><h1 className="font-black">About US</h1></Button>
        </div>
        <Grid style={{ margin: 20 }}>
        <h1 style={{ color: "black", alignItems: "center" }} >
          <strong className="c">Solo Art Journey Tracker </strong>
        </h1>
      </Grid>
        <div>
            <Button className="btn" onClick={onSignUpClick}><h1 className="font-black">Sign Up</h1></Button>
            <Button className="btn" onClick={onRegisterClick}><h1 className="font-black">Register</h1></Button>
        </div>
    </nav>
);

export default NavBar;
