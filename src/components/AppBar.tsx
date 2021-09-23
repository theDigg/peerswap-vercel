// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../app/rootReducer'
// import { alpha, makeStyles, createStyles } from '@mui/material/styles'
// import { Send as SendIcon } from '@material-ui/icons'
// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import IconButton from '@mui/material/IconButton'
// import { Badge, Typography } from './Wrappers/Wrappers'
// import InputBase from '@mui/material/InputBase'
// import Fab from '@mui/material/Fab'
// import MenuItem from '@mui/material/MenuItem'
// import Menu from '@mui/material/Menu'
// import MenuIcon from '@material-ui/icons/Menu'
// import SearchIcon from '@material-ui/icons/Search'
// import Brightness4Icon from '@material-ui/icons/Brightness4'
// import AccountCircle from '@material-ui/icons/AccountCircle'
// import MailIcon from '@material-ui/icons/Mail'
// import NotificationsIcon from '@material-ui/icons/Notifications'
// import Notification from './Notification/Notification'
// import UserAvatar from './UserAvatar/UserAvatar'
// import MoreIcon from '@material-ui/icons/MoreVert'
// import classNames from 'classnames'
// import { withRouter } from 'react-router-dom'
// import { setWallet } from '../features/wallet/walletSlice'
// import { setTheme } from '../features/theme/themeSlice'
// // import useStyles from './styles'

// const useStyles = makeStyles((theme: any) =>
//   createStyles({
//     grow: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//       [theme.breakpoints.up('sm')]: {
//         display: 'none',
//       },
//     },
//     title: {
//       display: 'none',
//       [theme.breakpoints.up('sm')]: {
//         display: 'block',
//       },
//     },
//     appBar: {
//       zIndex: theme.zIndex.drawer + 1,
//       [theme.breakpoints.up('sm')]: {
//         // width: `calc(100% - ${drawerWidth}px)`,
//         // marginLeft: drawerWidth,
//       },
//     },
//     search: {
//       position: 'relative',
//       borderRadius: theme.shape.borderRadius,
//       backgroundColor: alpha(theme.palette.common.white, 0.15),
//       '&:hover': {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//       },
//       marginRight: theme.spacing(2),
//       marginLeft: 0,
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         marginLeft: theme.spacing(9),
//         width: '40%',
//       },
//     },
//     searchIcon: {
//       padding: theme.spacing(0, 2),
//       height: '100%',
//       position: 'absolute',
//       pointerEvents: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     inputRoot: {
//       color: 'inherit',
//     },
//     inputInput: {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('md')]: {
//         width: '40ch',
//       },
//     },
//     sectionDesktop: {
//       display: 'none',
//       [theme.breakpoints.up('md')]: {
//         display: 'flex',
//       },
//     },
//     sectionMobile: {
//       display: 'flex',
//       [theme.breakpoints.up('md')]: {
//         display: 'none',
//       },
//     },
//     sendMessageButton: {
//       margin: theme.spacing(4),
//       marginTop: theme.spacing(2),
//       marginBottom: theme.spacing(2),
//       textTransform: 'none',
//     },
//     sendButtonIcon: {
//       marginLeft: theme.spacing(2),
//     },
//     messageNotificationSide: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       marginRight: theme.spacing(2),
//     },
//     messageNotificationBodySide: {
//       alignItems: 'flex-start',
//       marginRight: 0,
//     },
//     profileMenuLink: {
//       fontSize: 16,
//       textDecoration: 'none',
//       '&:hover': {
//         cursor: 'pointer',
//       },
//     },
//     messageNotification: {
//       height: 'auto',
//       display: 'flex',
//       alignItems: 'center',
//       '&:hover, &:focus': {
//         backgroundColor: theme.palette.background.default,
//       },
//     },
//     headerMenu: {
//       marginTop: theme.spacing(7),
//     },
//     headerMenuList: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     headerMenuItem: {
//       '&:hover, &:focus': {
//         backgroundColor: theme.palette.background.light,
//         // color: "white",
//       },
//     },
//     profileMenu: {
//       minWidth: 265,
//     },
//     profileMenuUser: {
//       display: 'flex',
//       flexDirection: 'column',
//       padding: theme.spacing(2),
//     },
//     headerMenuButton: {
//       marginLeft: theme.spacing(2),
//       padding: theme.spacing(0.5),
//     },
//     headerIcon: {
//       fontSize: 28,
//       color: 'rgba(255, 255, 255, 0.35)',
//     },
//   })
// )

// // const messages = [
// //   {
// //     id: 0,
// //     variant: 'warning',
// //     name: 'Aamir Syed',
// //     message: 'Hey! How is it going?',
// //     time: '9:32',
// //   },
// //   {
// //     id: 1,
// //     variant: 'success',
// //     name: 'Omar Syed',
// //     message: 'Check this out!',
// //     time: '9:18',
// //   },
// //   {
// //     id: 2,
// //     variant: 'primary',
// //     name: 'Greg Hemmer',
// //     message: 'I want rearrange the appointment',
// //     time: '9:15',
// //   },
// //   {
// //     id: 3,
// //     variant: 'secondary',
// //     name: 'Shazhad Nathani',
// //     message: 'Good news from sales department',
// //     time: '9:09',
// //   },
// // ]

// const notifications = [
//   { id: 0, color: 'warning', message: 'Someone has bid on your swap!' },
//   {
//     id: 1,
//     color: 'success',
//     type: 'info',
//     message: 'Your swap is complete!',
//   },
//   {
//     id: 2,
//     color: 'secondary',
//     type: 'notification',
//     message: 'This is just a simple notification',
//   },
// ]

// function formatDate(date) {
//   // var year = date.getFullYear(),
//     // month = date.getMonth() + 1, // months are zero indexed
//     // day = date.getDate(),
//     var hour = date.getHours(),
//     minute = date.getMinutes(),
//     // second = date.getSeconds(),
//     hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
//     minuteFormatted = minute < 10 ? '0' + minute : minute,
//     morning = hour < 12 ? 'am' : 'pm'

//   return (
//     // month +
//     // '/' +
//     // day +
//     // '/' +
//     // year +
//     // ' ' +
//     hourFormatted + ':' + minuteFormatted + morning
//   )
// }

// function PrimarySearchAppBar(props) {
//   const classes = useStyles()
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
//   const [
//     mobileMoreAnchorEl,
//     setMobileMoreAnchorEl,
//   ] = React.useState<null | HTMLElement>(null)
//   var [mailMenu, setMailMenu] = useState(null)
//   var [notificationsMenu, setNotificationsMenu] = useState(null)
//   var [isMailsUnread, setIsMailsUnread] = useState(true)
//   var [isNotificationsUnread, setIsNotificationsUnread] = useState(true)
//   const { recentMessages } = useSelector((state: RootState) => state.messages)
//   const { theme } = useSelector((state: RootState) => state.theme)

//   const dispatch = useDispatch()

//   const isMenuOpen = Boolean(anchorEl)
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

//   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null)
//   }

//   const handleMenuClose = (route: string) => {
//     setAnchorEl(null)
//     handleMobileMenuClose()
//     props.history.push(route)
//   }

//   const handleMailMenuClose = (route: string) => {
//     setMailMenu(null)
//     handleMobileMenuClose()
//     props.history.push(route)
//   }

//   const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setMobileMoreAnchorEl(event.currentTarget)
//   }

//   const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
//     if (theme === 'light') {
//       dispatch(setTheme('dark'))
//     } else {
//       dispatch(setTheme('light'))
//     }
//   }

//   const menuId = 'primary-search-account-menu'
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={() => handleMenuClose('/')}>Profile</MenuItem>
//       <MenuItem onClick={() => handleMenuClose('/settings')}>Settings</MenuItem>
//       <MenuItem onClick={() => handleMenuClose('/email')}>Email</MenuItem>
//       <MenuItem
//         onClick={() => {
//           handleMenuClose('/')
//           dispatch(setWallet(null))
//         }}
//       >
//         Sign out
//       </MenuItem>
//     </Menu>
//   )

//   const mobileMenuId = 'primary-search-account-menu-mobile'
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem onClick={handleThemeClick}>
//         <IconButton
//           aria-label="toggle-dark-theme"
//           aria-controls="toggle-dark-theme"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <Brightness4Icon />
//         </IconButton>
//         <p>Dark Mode</p>
//       </MenuItem>
//       <MenuItem
//         onClick={(e) => {
//           setMailMenu(e.currentTarget)
//           setIsMailsUnread(false)
//         }}
//       >
//         <IconButton
//           aria-label="show new messages"
//           color="inherit"
//           aria-haspopup="true"
//           aria-controls="mail-menu"
//         >
//           <Badge
//             badgeContent={
//               isMailsUnread ? Object.keys(recentMessages).length : null
//             }
//             color="secondary"
//           >
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem
//         onClick={(e) => {
//           setNotificationsMenu(e.currentTarget)
//           setIsNotificationsUnread(false)
//         }}
//       >
//         <IconButton
//           color="inherit"
//           aria-haspopup="true"
//           aria-controls="mail-menu"
//         >
//           <Badge
//             badgeContent={isNotificationsUnread ? notifications.length : null}
//             color="secondary"
//           >
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Account</p>
//       </MenuItem>
//     </Menu>
//   )

//   return (
//     <div className={classes.grow}>
//       <AppBar position="fixed" className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={props.toggle}
//             className={classes.menuButton}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography className={classes.title} variant="h6" noWrap>
//             PeerSwap
//           </Typography>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </div>
//           <div className={classes.grow} />
//           {props.wallet && (
//             <div className={classes.sectionDesktop}>
//               <IconButton
//                 edge="start"
//                 aria-label="toggle-dark-theme"
//                 aria-controls="theme"
//                 aria-haspopup="true"
//                 onClick={handleThemeClick}
//                 color="inherit"
//               >
//                 <Brightness4Icon />
//               </IconButton>
//               <IconButton
//                 aria-label="show new messages"
//                 color="inherit"
//                 aria-haspopup="true"
//                 aria-controls="mail-menu"
//                 onClick={(e) => {
//                   setMailMenu(e.currentTarget)
//                   setIsMailsUnread(false)
//                 }}
//               >
//                 <Badge
//                   badgeContent={
//                     isMailsUnread ? Object.keys(recentMessages).length : null
//                   }
//                   color="secondary"
//                 >
//                   <MailIcon />
//                 </Badge>
//               </IconButton>
//               <IconButton
//                 color="inherit"
//                 aria-haspopup="true"
//                 aria-controls="mail-menu"
//                 onClick={(e) => {
//                   setNotificationsMenu(e.currentTarget)
//                   setIsNotificationsUnread(false)
//                 }}
//               >
//                 <Badge
//                   badgeContent={
//                     isNotificationsUnread ? notifications.length : null
//                   }
//                   color="secondary"
//                 >
//                   <NotificationsIcon />
//                 </Badge>
//               </IconButton>
//               <IconButton
//                 edge="end"
//                 aria-label="account of current user"
//                 aria-controls={menuId}
//                 aria-haspopup="true"
//                 onClick={handleProfileMenuOpen}
//                 color="inherit"
//               >
//                 <AccountCircle />
//               </IconButton>
//             </div>
//           )}
//           {props.wallet && (
//             <div className={classes.sectionMobile}>
//               <IconButton
//                 aria-label="show more"
//                 aria-controls={mobileMenuId}
//                 aria-haspopup="true"
//                 onClick={handleMobileMenuOpen}
//                 color="inherit"
//               >
//                 <MoreIcon />
//               </IconButton>
//             </div>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Menu
//         id="mail-menu"
//         open={Boolean(mailMenu)}
//         anchorEl={mailMenu}
//         onClose={() => setMailMenu(null)}
//         MenuListProps={{ className: classes.headerMenuList }}
//         className={classes.headerMenu}
//         classes={{ paper: classes.profileMenu }}
//         disableAutoFocusItem
//       >
//         <div className={classes.profileMenuUser}>
//           <Typography variant="h4">New Messages</Typography>
//           <Typography
//             className={classes.profileMenuLink}
//             component="a"
//             color="secondary"
//           >
//             {Object.keys(recentMessages).length} New Messages
//           </Typography>
//         </div>
//         {Object.keys(recentMessages).map((handle, id) => (
//           <MenuItem
//             key={id}
//             className={classes.messageNotification}
//             onClick={() => handleMailMenuClose(`/messages/${handle}`)}
//           >
//             <div className={classes.messageNotificationSide}>
//               <UserAvatar color={'primary'} name={handle} />
//               <Typography>
//                 {formatDate(new Date(recentMessages[handle].timestamp))}
//               </Typography>
//             </div>
//             <div
//               className={classNames(
//                 classes.messageNotificationSide,
//                 classes.messageNotificationBodySide
//               )}
//             >
//               <Typography gutterBottom>{handle}</Typography>
//               <Typography>{recentMessages[handle].body}</Typography>
//             </div>
//           </MenuItem>
//         ))}
//         <Fab
//           variant="extended"
//           color="primary"
//           aria-label="Add"
//           className={classes.sendMessageButton}
//           onClick={() => props.history.push('/messages')}
//         >
//           Send New Message
//           <SendIcon className={classes.sendButtonIcon} />
//         </Fab>
//       </Menu>
//       <Menu
//         id="notifications-menu"
//         open={Boolean(notificationsMenu)}
//         anchorEl={notificationsMenu}
//         onClose={() => setNotificationsMenu(null)}
//         className={classes.headerMenu}
//         disableAutoFocusItem
//       >
//         {notifications.map((notification) => (
//           <MenuItem
//             key={notification.id}
//             onClick={() => setNotificationsMenu(null)}
//             className={classes.headerMenuItem}
//           >
//             <Notification {...notification} typographyVariant="inherit" />
//           </MenuItem>
//         ))}
//       </Menu>
//       {renderMobileMenu}
//       {renderMenu}
//     </div>
//   )
// }

// export default withRouter(PrimarySearchAppBar)

export default function () {}
