import React from 'react'
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CoursePage from './pages/CoursePage';
import ManageCourse from './pages/ManageCourse';
import ManageAccount from './pages/ManageAccount';
import ManageCourses from './pages/ManageCourses';

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Courses. Role: student, teacher*/}
                <Route path="/courses/:idCourse" element={<CoursePage />} />
                <Route path="/courses/:idCourse/manage" element={<ManageCourse />} />

                {/* Role: admin */}
                <Route path="/admin/manage" element={<ManageAccount />} />

                {/* Role: giaodu */}
                <Route path="/giaodu/manage" element={<ManageCourses />} />

            </Routes>
        </>
    )
}

export default App
