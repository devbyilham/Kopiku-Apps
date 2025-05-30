import React, { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Menu = React.lazy(() => import("./pages/Menu"));
const Loker = React.lazy(() => import("./pages/Loker"));
const Profil = React.lazy(() => import("./pages/Profil"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Loading = React.lazy(() => import("./components/Loading"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="loker" element={<Loker />} />
          <Route path="profil" element={<Profil />} />

          <Route path="/error400" element={<Error400 />} />
          <Route path="/error401" element={<Error401 />} />
          <Route path="/error403" element={<Error403 />} />
        </Route>
        <Route path="*" element={<NotFound />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
