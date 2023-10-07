import { Close, Menu } from '@mui/icons-material';
import {
  AppBar,
  Box, Button, Dialog, Hidden, IconButton, Slide, Toolbar, Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { SectionIdEnum } from '../../../types';

export type NavigationProps = {
  isSmall: boolean;
};

const navigationItems = [
  {
    text: 'About',
    to: SectionIdEnum.about,
  },
  {
    text: 'FAQ',
    to: SectionIdEnum.FAQ,
  },
  {
    text: 'Pricing',
    to: SectionIdEnum.pricing,
  },
];

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const Navigation: React.FC<NavigationProps> = ({ isSmall }) => {
  const [ open, setOpen ] = useState(false);

  const onOpenHandler = () => setOpen(true);
  const onCloseHandler = () => setOpen(false);

  const mappedItems = (
    navigationItems.map(({ to, text }) => {
      return (
        <AnchorLink key={to} href={`#${to}`} offset={isSmall ? '56px' : '64px'} className="all_unset">
          <Button color="inherit" size="large" fullWidth={isSmall} onClick={onCloseHandler} 
           sx={{
            borderRadius: "2rem",
            "&:hover": {
              backgroundColor: "#7C81AD",
              opacity: [0.9, 0.8, 0.7],
            },
          }}>
            {text}
          </Button>
        </AnchorLink>
      );
    })
  );

  return (
    <>
      <Hidden smDown>
        <Box display="flex" gap={2}>
          {mappedItems}
        </Box>
      </Hidden>
      <Hidden smUp>
        <IconButton color="inherit" onClick={onOpenHandler}>
          <Menu />
        </IconButton>
        <Dialog
          open={open}
          fullScreen
          fullWidth
          TransitionComponent={Transition}
          hideBackdrop
          PaperProps={{
            sx: {
              boxShadow: 'none',
              backgroundColor: '#213555',
              color: "#F0F0F0",
            },
          }}
        >
          <AppBar position="static" sx={{ background: '#2E4374', color: '#F0F0F0' }}>
            <Toolbar>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                Menu
              </Typography>
              <IconButton color="inherit" onClick={onCloseHandler}>
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box display="flex" alignItems={"center"} flexDirection="column" py={3} width="100%">
            {mappedItems}
          </Box>
        </Dialog>
      </Hidden>
    </>
  );
};