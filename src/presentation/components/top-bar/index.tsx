import React from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GPICLogo from '@/presentation/assets/logo-gpic-white.svg';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigateToNoticePage = () => {
        navigate('/edital');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwtToken');
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ padding: '1rem' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <img
                    src={GPICLogo}
                    alt="Gerenciamento de Projetos de Iniciação Científica"
                    width={160}
                />

                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    sx={{ marginRight: '1rem' }}
                >
                    <MenuIcon />
                </IconButton>

                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
                    <MenuItem onClick={navigateToNoticePage}>Gerenciar Editais</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
