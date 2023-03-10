import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUserAPI, unFollowUserAPI } from '../../Api/userAPI'

export default function BtnFollow() {

    const dispatch = useDispatch()
    const { auth, profile, socketInstance } = useSelector(state => state)
    const { socket } = socketInstance

    const [followed, setFollowed] = useState(false)

    useEffect(() => {
        if (auth.user.following.find((item) => item === profile.user?._id)) {
            setFollowed(true); // UnFollow
        }
    }, [auth.user.following, profile.user?._id])

    const handleFollow = () => {
        followUserAPI(profile.user._id, dispatch, socket)
        setFollowed(true); // UnFollow
    };

    const handleUnFollow = () => {
        unFollowUserAPI(profile.user._id, dispatch, socket)
        setFollowed(false); //  Follow
    };

    return (
        <>
            {
                followed ? (
                    <div
                        className="px-3 py-2 rounded text-white text-sm bg-red-600 flex gap-1 items-center cursor-pointer duration-300 hover:bg-primary-red"
                        onClick={handleUnFollow}
                    >
                        <box-icon type='solid' name='user-x'></box-icon>
                        <span>Hủy theo dõi</span>
                    </div>
                ) : (
                    <div
                        className="px-3 py-2 rounded text-white text-sm bg-second-blue flex gap-1 items-center cursor-pointer duration-300 hover:bg-primary-blue"
                        onClick={handleFollow}
                    >
                        <box-icon name="user-plus" color="white"></box-icon>
                        <span>Theo dõi</span>
                    </div>
                )
            }
        </>
    )
}
