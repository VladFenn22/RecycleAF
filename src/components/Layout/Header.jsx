import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import TableViewIcon from '@mui/icons-material/TableView';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import recycleaf_logo from '../../assets/recycleaf_logo.png';
import { Button, MenuList } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import { useState, useContext, useEffect } from 'react';

function Header() {

  const {user, decodeToken, autorize} = useContext(UserContext);
  const [userData, setUserData]=useState(decodeToken())


  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElMant, setAnchorElMant] = React.useState(null);


  useEffect(()=>{
    setUserData(decodeToken())
  },[decodeToken,user])



  const handleOpenMantMenu = (event) => {
    setAnchorElMant(event.currentTarget);
  };
 
  const handleCloseMantMenu = () => {
    setAnchorElMant(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <img
      src={recycleaf_logo}
      style={{ maxWidth: '100px', height: 'auto', marginRight: '10px' }}
    />
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="/"
      sx={{
        fontFamily: 'Bodoni 72',
        fontWeight: 700,
        letterSpacing: '.2rem',
        color: 'inherit',
        textDecoration: 'none',
        marginRight: '30px', 
      }}
    >
      RECYCLEAF
    </Typography>
  </Box>

   {/* Botón Material */}
   <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'contents' } }}>
            <Button
              component="a"
              href="/material/"
              color="inherit"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 600,
         
                textDecoration: 'none',
                height: '100%', // Ajuste de altura
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 1, // Espaciado izquierdo
                paddingRight: 1, // Espaciado derecho
              }}
            >
              Materiales
            </Button>
          </Box>

          {/* Botón Centro de acopio */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'contents' } }}>
            <Button
              component="a"
              href="/centroacopio/"
              color="inherit"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 600,
              
                textDecoration: 'none',
                height: '100%', // Ajuste de altura
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 1, // Espaciado izquierdo
                paddingRight: 1, // Espaciado derecho
              }}
            >
              Centro de acopio
            </Button>
          </Box>

          {/* Botón Historial de materiales */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component="a"
              href="/historialmaterialcl-table/"
              color="inherit"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 600,
          
                textDecoration: 'none',
                height: '100%', // Ajuste de altura
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 1, // Espaciado izquierdo
                paddingRight: 1, // Espaciado derecho
              }}
            >
              Historial de materiales
            </Button>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img src={recycleaf_logo} style={{ maxWidth: '100px', height: 'auto' }} />
          </Box>


            {/* Menu Mantenimientos */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Mantenimientos">
                <IconButton onClick={handleOpenMantMenu} sx={{ p: 1 }}>
                  <TableViewIcon style={{ fill:'white'}} />
                </IconButton>
       
              </Tooltip>
              
              <Menu
              
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElMant}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElMant)}
                onClose={handleCloseMantMenu}
              >
  
                  {/* {user && autorize({allowedRoles: ['administrador']}) &&    */}
                 <MenuList  >
                 <MenuItem  component='a' href='/centroacopio-table/'>
                   <Typography textAlign="center">Mantenimiento Centros de Acopio</Typography>
                 </MenuItem>
                 <MenuItem component='a' href='/cupon/'>
                   <Typography textAlign="center">Mantenimiento de Cupones</Typography>
                 </MenuItem>
                 <MenuItem component='a' href='/canjearmaterial/1'>
                    <Typography textAlign="center">Canjear</Typography>
                  </MenuItem>
                 <MenuItem component='a' href='/material-table/'>
                   <Typography textAlign="center">Mantenimiento de Materiales</Typography>
                 </MenuItem>
                 <MenuItem component='a' href='/admin-table/'>
                   <Typography textAlign="center">Mantenimiento de Administradores</Typography>
                 </MenuItem>
               </MenuList>
            {/* }  */}
              </Menu>
            </Box>
  {/* Menu Mantenimientos */}


            {/* Menu Usuarios */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Usuario">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <PersonIcon style={{ fill:'white'}} />
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
              {!userData &&(
                <MenuList>
                  <MenuItem component='a' href='/usuario/login'>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem component='a' href='/usuario/create'>
                    <Typography textAlign="center">Registrarse</Typography>
                  </MenuItem>
                </MenuList>
              )}
                {userData &&(
                  <MenuList>
                 <MenuItem>
                    <Typography variant='subtitle1' gutterBottom>
                      {userData?.correo}
                    </Typography>
                  </MenuItem> 
                  <MenuItem color='secondary' component='a' href='/usuario/logout'>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </MenuList>
            )}
              </Menu>
            </Box>
  {/* Menu Usuarios */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
