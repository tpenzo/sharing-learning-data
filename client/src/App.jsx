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
import PageNotFound from './pages/PageNotFound';
import RequireAuth from './requireAuth';

function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                {/* <Route element={<RequireAuth />}> */}
                <Route exact path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />

                {/* Courses. Role: student, teacher*/}
                <Route path="/courses/:idCourse" element={<CoursePage />} />
                <Route path="/courses/:idCourse/manage" element={<ManageCourse />} />

                {/* Role: admin */}
                <Route path="/admin/manage" element={<ManageAccount />} />

                {/* Role: ministry */}
                <Route path="/ministry/manage" element={<ManageCourses />} />

                {/* </Route> */}
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </>
    )
}

export default App
