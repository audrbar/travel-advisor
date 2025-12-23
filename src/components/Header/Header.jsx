import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'block' } }}>
          Travel Advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Explore new places
          </Typography>
          <Box sx={{
            position: 'relative',
            borderRadius: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
            marginRight: 2,
            marginLeft: 0,
            width: '100%',
            sm: { marginLeft: 3, width: 'auto' },
          }}>
            <Box sx={{
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                color: 'inherit',
                '& .MuiInputBase-input': {
                  padding: '8px 8px 8px 0',
                  paddingLeft: 'calc(1em + 32px)',
                  transition: 'width 0.3s',
                  width: '100%',
                  md: { width: '20ch' },
                },
              }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;