import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './home'
import { SignUp } from './signup'
import { SignUpEmail } from './signup-email'
import { SignInEmail } from './signin-email'
import { SignIn } from './signin'
import { Settings } from './settings'

const Root: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up-email" element={<SignUpEmail />} />
                <Route path="/sign-in-email" element={<SignInEmail />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    )
}

export { Root }
