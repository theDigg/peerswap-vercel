import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const NotificationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));
export const notificationContained = styled("div")(({ theme }) => ({
  borderRadius: 45,
  height: 45,
  boxShadow: theme.shadows[10]
}));
export const notificationContainedShadowless = styled("div")(({ theme }) => ({
  boxShadow: "none",
}));
export const notificationIconContainer = styled("div")(({ theme }) => ({
  minWidth: 45,
  height: 45,
  borderRadius: 45,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 24,
}));
export const notificationIconContainerContained = styled("div")(
  ({ theme }) => ({
    fontSize: 18,
    color: "#FFFFFF80",
  })
);
export const notificationIconContainerRounded = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(2),
}));
export const messageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexGrow: 1,
}));
export const extraButton = styled("div")(({ theme }) => ({
  color: "white",
  "&:hover, &:focus": {
    background: "transparent",
  },
}));

export default makeStyles((theme: any) => ({
  notificationContainer: {
    display: "flex",
    alignItems: "center",
  },
  notificationContained: {
    borderRadius: 45,
    height: 45,
    boxShadow: theme.shadows[3],
  },
  notificationContainedShadowless: {
    boxShadow: "none",
  },
  notificationIconContainer: {
    minWidth: 45,
    height: 45,
    borderRadius: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },
  notificationIconContainerContained: {
    fontSize: 18,
    color: "#FFFFFF80",
  },
  notificationIconContainerRounded: {
    marginRight: theme.spacing(2),
  },
  containedTypography: {
    color: "white",
  },
  messageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  extraButton: {
    color: "white",
    "&:hover, &:focus": {
      background: "transparent",
    },
  },
}));
