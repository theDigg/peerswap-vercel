// import React from 'react'
// import {
//   CssBaseline,
//   Drawer as MUIDrawer,
//   Divider,
//   Hidden,
//   ListItem,
//   List,
//   ListItemIcon,
//   ListItemText,
// } from '@mui/material'
// import {
//   makeStyles,
//   useTheme,
//   Theme,
//   createStyles,
// } from '@mui/material/styles'
// import InputIcon from '@material-ui/icons/Input'
// import HomeIcon from '@material-ui/icons/Home'
// import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
// import ImportExportIcon from '@material-ui/icons/ImportExport'
// import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
// // import MessageIcon from '@material-ui/icons/Message'
// import GroupIcon from '@material-ui/icons/Group'
// import HistoryIcon from '@material-ui/icons/History'
// import ReceiptIcon from '@material-ui/icons/Receipt'
// import BarChartIcon from '@material-ui/icons/BarChart'
// import TuneIcon from '@material-ui/icons/Tune'
// import InfoIcon from '@material-ui/icons/Info'
// // import StyleIcon from '@material-ui/icons/Style'
// import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// import PrimarySearchAppBar from './AppBar'
// import { withRouter } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { setWallet } from '../features/wallet/walletSlice'

// const drawerWidth = 240

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//     },
//     drawer: {
//       [theme.breakpoints.up('sm')]: {
//         width: drawerWidth,
//         flexShrink: 0,
//       },
//     },
//     appBar: {
//       zIndex: theme.zIndex.drawer + 1,
//       [theme.breakpoints.up('sm')]: {
//         // width: `calc(100% - ${drawerWidth}px)`,
//         // marginLeft: drawerWidth,
//       },
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//       [theme.breakpoints.up('sm')]: {
//         display: 'none',
//       },
//     },
//     // necessary for content to be below app bar
//     toolbar: theme.mixins.toolbar,
//     drawerPaper: {
//       width: drawerWidth,
//     },
//     content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//     },
//   })
// )

// const Drawer = (props) => {
//   const { window, history, wallet } = props
//   const classes = useStyles()
//   const theme = useTheme()
//   const [mobileOpen, setMobileOpen] = React.useState(false)
//   const dispatch = useDispatch()

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen)
//   }

//   const itemsList = [
//     {
//       text: 'Welcome',
//       icon: <HomeIcon />,
//       show: wallet === null,
//       onClick: () => history.push('/welcome'),
//     },
//     {
//       text: 'Register',
//       icon: <InputIcon />,
//       show: wallet === null,
//       onClick: () => history.push('/register'),
//     },
//     {
//       text: 'Import',
//       icon: <ImportExportIcon />,
//       show: wallet === null,
//       onClick: () => history.push('/import'),
//     },
//     {
//       text: 'Home',
//       icon: <HomeIcon />,
//       show: wallet !== null,
//       onClick: () => history.push('/'),
//     },
//     {
//       text: 'Wallet',
//       icon: <AccountBalanceWalletIcon />,
//       show: wallet !== null,
//       onClick: () => history.push('/wallet'),
//     },
//     {
//       text: 'Swaps',
//       icon: <SwapHorizIcon />,
//       show: wallet !== null,
//       onClick: () => history.push('/swaps'),
//     },
//     {
//       text: 'Messages',
//       icon: <GroupIcon />,
//       show: wallet !== null,
//       onClick: () => history.push('/messages'),
//     },
//     {
//       text: 'Tx History',
//       icon: <HistoryIcon />,
//       show: wallet !== null,
//       onClick: () => history.push('/transactions'),
//     },
//     {
//       text: 'Tx Receipts',
//       icon: <ReceiptIcon />,
//       show: wallet !== null,
//       onClick: () => history.push('/receipts'),
//     },
//     {
//       text: 'Economy',
//       icon: <BarChartIcon />,
//       show: wallet !== null,
//       onClick: () => history.push('/economy'),
//     },
//     {
//       text: 'Settings',
//       icon: <TuneIcon />,
//       show: true,
//       onClick: () => history.push('/settings'),
//     },
//     {
//       text: 'About',
//       icon: <InfoIcon />,
//       show: true,
//       onClick: () => history.push('/about'),
//     },
//     {
//       text: 'Sign out',
//       icon: <ExitToAppIcon />,
//       show: wallet !== null,
//       onClick: () => {
//         dispatch(setWallet(null))
//       },
//     },
//   ]

//   const drawer = (
//     <>
//       <div className={classes.toolbar} />
//       <List>
//         {itemsList
//           .filter((item) => item.show)
//           .map((item, index) => {
//             const { text, icon, onClick } = item
//             return (
//               <div key={index}>
//                 <ListItem button key={index} onClick={onClick}>
//                   {icon && <ListItemIcon>{icon}</ListItemIcon>}
//                   <ListItemText primary={text} />
//                 </ListItem>
//                 <Divider />
//               </div>
//             )
//           })}
//       </List>
//     </>
//   )

//   const container =
//     window !== undefined ? () => window().document.body : undefined

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <PrimarySearchAppBar toggle={handleDrawerToggle} wallet={wallet}/>
//       <nav className={classes.drawer} aria-label="mailbox folders">
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Hidden smUp implementation="css">
//           <MUIDrawer
//             container={container}
//             variant="temporary"
//             anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             ModalProps={{
//               keepMounted: true, // Better open performance on mobile.
//             }}
//           >
//             {drawer}
//           </MUIDrawer>
//         </Hidden>
//         <Hidden xsDown implementation="css">
//           <MUIDrawer
//             classes={{
//               paper: classes.drawerPaper,
//             }}
//             variant="permanent"
//             open
//           >
//             {drawer}
//           </MUIDrawer>
//         </Hidden>
//       </nav>
//       <div className={classes.toolbar} />
//     </div>
//   )
// }

// export default withRouter(Drawer)
export default function () {}
