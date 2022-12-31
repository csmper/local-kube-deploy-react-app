import * as React from 'react';
import { styled } from '@mui/material/styles';
import NavMenu from "../nav-menu/NavMenu";
import MuiAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import jwt_decode from "jwt-decode";
import Login from '../login/Login';
import User from '../user/User';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Header() {
    const [open, setOpen] = React.useState(false);
    const [openUser, setOpenUser] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);
    const userToken = localStorage.getItem('userToken');
    const avatarRef = React.createRef();
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const menuStyle = {
        marginRight: 5,
        ...(open && { display: 'none' }),
    };

    const handleLoginResponse = (response) => {
        if(response.credential) {
            localStorage.setItem('userToken', response.credential);
            setUser(jwt_decode(response.credential));
        }
    };

    const toggleUserPopover = () => setOpenUser(!openUser);

    React.useEffect(() => {
        if(userToken) {
            setUser(jwt_decode(userToken));
        }
    }, [userToken])

    React.useEffect(() => {
        setAvatar(avatarRef.current);
    }, [avatarRef])

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={menuStyle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                    <Box sx={{marginLeft: 'auto'}}>
                        { !user ? <Login handleLoginResponse={handleLoginResponse}></Login> : <Avatar sx={{cursor: "pointer"}} ref={avatarRef} onClick={toggleUserPopover} alt="profile photo" src={user.picture}/> }
                    </Box>
                </Toolbar>
            </AppBar>
            <NavMenu open={open} handleDrawerClose={handleDrawerClose}></NavMenu>
            <User openUser={openUser} user={user} avatar={avatar} toggleUserPopover={toggleUserPopover}></User>
        </Box>
    );
}