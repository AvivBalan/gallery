import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';


type SidebarLink = {
  text: string,
  path: string
};

const links: SidebarLink[] = [
  {text: 'Homepage', path: '/'},
  {text: 'Upload', path: '/upload'}
];

interface SidebarProps {
  isOpen: boolean,
  toggleDrawer: (isOpen: boolean) => void
}

export default function Sidebar(props: SidebarProps) {
  return (
    <Drawer
        anchor='left'
        open={props.isOpen}
        onClose={() => props.toggleDrawer(false)}
    >
        <Box
            sx={{
            width: 200,
            height: '100%',
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
        <List>
        {links.map((link: SidebarLink) => (
          <Link key={`sidebar-link-${link.text}`} to={link.path} className='sidebar-link'>
            <ListItem button>
              <ListItemText primary={link.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
    </Drawer>
  );
}
