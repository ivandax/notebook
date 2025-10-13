import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './home'
import { SignUp } from './signup'

const Root: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export { Root }
