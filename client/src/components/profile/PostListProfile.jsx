import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserPost, likePostInProfile, unLikePostInProfile } from '../../Api/postAPI'
import PostItem from '../post/PostItem'

export default function PostListProfile() {
    const dispatch = useDispatch()
    const { userId } = useParams()

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
    }, [userId])

    
    return (
        <div className={"mt-5 h-[60%] bg-gray-200/20 pr-1 grid grid-cols-2 gap-2 overflow-y-auto py-2 px-1" + `${posts.length/2 > 1 ? "" : " grid-rows-[repeat(2,minmax(200px,500px))] h-[63%] overflow-y-hidden"} `}>
            {
                posts && posts.length > 0 &&
                posts.map(post => <PostItem
                    key={post._id}
                    dataItem={post}
                    funcLikePost={likePostProfile}
                    funcUnLikePost={unLikePostProfile}
                />)
            }
        </div>
        
    )
}
