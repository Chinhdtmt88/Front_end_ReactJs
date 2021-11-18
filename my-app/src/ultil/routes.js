/* eslint-disable import/no-anonymous-default-export */
import { lazy } from "react";

const Home = lazy(() => import("../components/Home"));
const Login = lazy(() => import("../components/Login"));
const Register = lazy(() => import("../components/Register"));
const Profile = lazy(() => import("../components/Profile"));
const Manage_user = lazy(() => import("../components/Manage_user"));

export default [
  {
    path: "/",
    exact: true,
    public: true,
    component: Home,
  },
  {
    path: "/home",
    exact: true,
    public: true,
    component: Home,
  },
  {
    path: "/login",
    exact: true,
    public: true,
    component: Login,
  },
  {
    path: "/register",
    exact: true,
    public: true,
    component: Register,
  },
  {
    path: "/profile",
    exact: true,
    public: true,
    component: Profile,
  },
  {
    path: "/manage_user",
    exact: true,
    public: true,
    component: Manage_user,
  },
];
