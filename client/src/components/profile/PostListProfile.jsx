import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserPost, likePostInProfile, unLikePostInProfile } from '../../Api/postAPI'
import PostItem from '../post/PostItem'

export default function PostListProfile() {
    const dispatch = useDispatch()
    const { userId } = useParams()

    const user = useSelector(state => state.auth.user)
    const posts = useSelector(state => state.profile.posts)


    // Call API and update store HomePage
    const likePostProfile = async (postId, userId) => {
        await likePostInProfile(postId, userId, dispatch)
    }

    const unLikePostProfile = async (postId, userId) => {
        await unLikePostInProfile(postId, userId, dispatch)
    }

    useEffect(() => {
        getUserPost(userId, dispatch)
    }, [])

    
    return (
        <>
            {
                posts.map(post => <PostItem
                    key={post._id}
                    dataItem={post}
                    funcLikePost={likePostProfile}
                    funcUnLikePost={unLikePostProfile}
                />)
            }
        </>
    )
}
