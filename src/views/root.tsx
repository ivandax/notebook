import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './home'
import { SignUp } from './signup'
import { SignUpEmail } from './signup-email'

const Root: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-up-email" element={<SignUpEmail />} />
            </Routes>
        </BrowserRouter>
    )
}

export { Root }
