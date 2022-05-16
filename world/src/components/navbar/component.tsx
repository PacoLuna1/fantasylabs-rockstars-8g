import AppBar from '@mui/material/AppBar';
import { useEffect, useState } from "react";
import { styles } from "./styles";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAppSelector } from "../../app/hooks";
import { ImLab } from 'react-icons/im'; 
import { tokenSelector } from '../../feature/authSlice';
import { logout } from '../../services/user';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch:AppDispatch = useDispatch();

  const token = useAppSelector(tokenSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (token.access === "") navigate("/login");
  }, [navigate, token]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    if(setting === "Logout"){
      dispatch(logout(token));
    }
  };



  return (
    <AppBar sx={styles.appbar}>
      <Container sx={styles.container} maxWidth={false}>
        <Toolbar disableGutters sx={styles.toolbar}>
          <IconButton sx={styles.mainIcon} >
            <ImLab />
          </IconButton>
          <Typography sx={styles.title} variant="h4">
            FantasyLabs
          </Typography>
          <Box sx={styles.box}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
