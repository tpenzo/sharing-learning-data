import React, { useEffect } from 'react'
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
import ViewPostPage from './pages/ViewPostPage';
import PageNotFound from './pages/PageNotFound';
import CreateCourse from './pages/CreateCourse';
import RequireAuth from './requireAuth';
import RequirePermission from './RequirePermission';
import Unauthorized from './pages/Unauthorized';
import ChatPage from './pages/ChatPage';
import io from 'socket.io-client'
import { setSocket } from './redux/SocketSlice.js';
import { useDispatch } from 'react-redux'


function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        let socket = io('http://localhost:4000')
        dispatch(setSocket(socket))
    }, [])

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route element={<RequireAuth />}>
                    
                    <Route element={<RequirePermission roles={['teacher', 'student']} />}>
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="/profile/:userId" element={<ProfilePage />} />
                        <Route path="/courses/:idCourse" element={<CoursePage />} />
                        <Route exact path="/chat" element={<ChatPage />} />
                        <Route path="post/:postId" element={<ViewPostPage />}/>
                    </Route>

                    <Route element={<RequirePermission roles={['teacher']} />}>
                        <Route path="/courses/:idCourse/manage" element={<ManageCourse />} />
                    </Route>

                    <Route element={<RequirePermission roles={['admin']} />}>
                        <Route path="/admin/manage" element={<ManageAccount />} />
                    </Route>

                    <Route element={<RequirePermission roles={['ministry']} />}>
                        <Route path="/ministry/manage" element={<ManageCourses />} />
                        <Route path="/ministry/manage/:courseId"  element={<CreateCourse />} />
                        <Route path="/ministry/create/" element={<CreateCourse />} />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />

                </Route>

                <Route path='*' element={<PageNotFound />} />
                <Route path='unauthorized' element={<Unauthorized />} />
            </Routes>
        </>
        // <>
        //     <Routes>
        //         <Route path="/login" element={<LoginPage />} />
        //         {/* <Route element={<RequireAuth />}> */}
        //         <Route exact path="/" element={<HomePage />} />
        //         <Route path="/profile/:id" element={<ProfilePage />} />
        //         <Route exact path="/chat" element={<ChatPage />} />

        //             {/* Post. role: student, teacher */}
        //             <Route path="post/:postId" element={<ViewPostPage />}/>

        //             {/* Courses. Role: student, teacher*/}
        //             <Route path="/courses/:idCourse" element={<CoursePage />} />
        //             <Route path="/courses/:idCourse/manage" element={<ManageCourse />} />


        //         {/* Role: admin */}
        //         <Route path="/admin/manage" element={<ManageAccount />} />

        //             {/* Role: ministry */}
        //             <Route path="/ministry/manage" element={<ManageCourses />} />
        //             <Route path="/ministry/course/" element={<CreateCourse />} />


        //         {/* </Route> */}
        //         <Route path='*' element={<PageNotFound />} />
        //     </Routes>
        // </>
    )
}

export default App
