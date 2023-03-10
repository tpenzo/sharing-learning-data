import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFollowerUser, updateUnfollowUser } from './redux/AuthSlice'

function ClientSocket() {

  const dispatch = useDispatch()

  const { auth, socketInstance } = useSelector(state => state)
  const { socket } = socketInstance

  useEffect(() => {
    socket?.emit('joinUser', auth.user._id)
  }, [socket, auth.user._id])

  // Follow -- received from server
  useEffect(() => {
    socket?.on('followToClient', user => {
      dispatch(updateFollowerUser(user))
    })
    return () => socket?.off('followToClient')
  }, [socket, dispatch])

  // UnFollow -- received from server
  useEffect(() => {
    socket?.on('unFollowToClient', user => {
      dispatch(updateUnfollowUser(user))
    })
    return () => socket?.off('unFollowToClient')
  }, [socket, dispatch])

  return <></>
}

export default ClientSocket