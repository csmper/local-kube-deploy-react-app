import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function User(props) {
    const { avatar, openUser, user} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'left',
    };

    const signOut = () => {
        // https://accounts.google.com/logout.
        localStorage.removeItem('userToken');
        window.location.href = "https://accounts.google.com/logout"
    };

    React.useEffect(() => {
        if(avatar) {
            setAnchorEl(avatar)
        }
    }, [avatar]);

    return (
        <Popover open={openUser} anchorEl={anchorEl} onClose={props.toggleUserPopover} anchorOrigin={anchorOrigin}>
            {
                user 
                    ? 
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Box sx={{display: 'flex',gap: '2rem', padding: '1rem'}}>
                                <Avatar sx={{ width: 96, height: 96 }} alt="profile photo" src={user.picture} />
                                <Box>
                                    <Typography sx={{ fontWeight: 500 }}><b>{user.name}</b></Typography>
                                    <Typography sx={{ fontWeight: 400, color: '#666' }}>{user.email}</Typography>
                                </Box>
                            </Box>
                            <Divider />
                            <Box sx={{marginLeft: 'auto', padding: '.5rem 1rem'}}>
                                <Button size="small" variant="outlined" onClick={signOut}>Sign out</Button>
                            </Box>
                        </Box> 
                    : ''
            }
        </Popover>
    );
}
