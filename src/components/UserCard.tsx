import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { BootstrapTooltip } from 'style/components/Tooltip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowDown from '@mui/icons-material/ArrowDropDown';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
// import Home from '@mui/icons-material/Home';
// import Settings from '@mui/icons-material/Settings';
// import MoodBadIcon from '@mui/icons-material/MoodBad';
// import MoodGoodIcon from '@mui/icons-material/Mood';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import People from '@mui/icons-material/People';
// import PermMedia from '@mui/icons-material/PermMedia';
// import Dns from '@mui/icons-material/Dns';
// import Public from '@mui/icons-material/Public';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LoopIcon from '@mui/icons-material/Loop';
import GavelIcon from '@mui/icons-material/Gavel';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const data = [
  {
    icon: <People />,
    stat: 'Reputation',
    statVariable: 'reputation',
    value: 1000
  },
  {
    icon: <LoopIcon />,
    stat: 'Swaps',
    statVariable: 'completedSwaps',
    value: 23
  },
  {
    icon: <ThumbDownIcon />,
    stat: 'Convictions',
    statVariable: 'convictions',
    value: 1
  },
  {
    icon: <ThumbUpIcon />,
    stat: 'Acquittals',
    statVariable: 'acquittals',
    value: 3
  },
  {
    icon: <GavelIcon />,
    stat: 'Jury Verdicts',
    statVariable: 'juryVerdicts',
    value: 12
  },
  {
    icon: <TrackChangesIcon />,
    stat: 'Jury Accuracy',
    statVariable: 'correctVerdicts',
    value: '100%'
  }
  // totalValueSwapped: number
  // winningProposals?: number
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20
  }
});

export default function UserCard({ user }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true
              }
            }
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' }
          }
        })}
      >
        <Paper elevation={0} sx={{ width: 356 }}>
          <FireNav component="nav" disablePadding>
            <ListItem component="div" disablePadding>
              <BootstrapTooltip title="Profile" placement="bottom">
                <ListItemButton sx={{ height: 56 }}>
                  <ListItemIcon sx={{ fontSize: 20 }}>
                    {user.emoji}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ my: 0 }}
                    primary={user.alias}
                    primaryTypographyProps={{
                      fontSize: 20,
                      fontWeight: 'medium',
                      letterSpacing: 0
                    }}
                  />
                </ListItemButton>
              </BootstrapTooltip>
              <BootstrapTooltip title="Stats" placement="bottom">
                <IconButton
                  size="large"
                  onClick={() => setOpen(!open)}
                  sx={{
                    '& svg': {
                      color: 'rgba(255,255,255,0.8)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)'
                    },
                    '&:hover': {
                      bgcolor: 'unset',
                      '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)'
                      },
                      '& svg:last-of-type': {
                        right: 0,
                        opacity: 1
                      }
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      height: '80%',
                      display: 'block',
                      left: 0,
                      width: '1px',
                      bgcolor: 'divider'
                    }
                  }}
                >
                  <QueryStatsIcon />
                  <ArrowDown
                    sx={{ position: 'absolute', right: 4, opacity: 0 }}
                  />
                </IconButton>
              </BootstrapTooltip>
            </ListItem>
            <Box
              sx={{
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open ? 2 : 0,
                display: open ? 'block' : 'none'
              }}
            >
              <Divider />
              <ListItem
                alignItems="flex-start"
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } }
                }}
              >
                <ListItemText
                  primary="Verified"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px'
                  }}
                  secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: '16px',
                    color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)'
                  }}
                  sx={{ my: 0 }}
                />
                <VerifiedUserIcon />
              </ListItem>
              {open &&
                data.map((item) => (
                  <ListItemButton
                    key={item.stat}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body1"
                            color="text.primary"
                          >
                            {item.stat}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      }
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: 'medium'
                      }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
