import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { SignUp } from './signup';
import { SignUpEmail } from './signup-email';
import { SignInEmail } from './signin-email';
import { SignIn } from './signin';
import { Settings } from './settings';
import { AppLayout } from './app-layout';
import { RequestResetPassword } from './request-reset-password';
import { ResetPassword } from './reset-password';
import { Organizations } from './organizations';

const Root: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/organizations" element={<Organizations />} />
        </Route>

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-up-email" element={<SignUpEmail />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-in-email" element={<SignInEmail />} />
        <Route
          path="/request-reset-password"
          element={<RequestResetPassword />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Root };
