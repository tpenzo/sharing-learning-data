import { Avatar, Wrap } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchResult({ searchResult }) {
    return (
        <>
            {
                searchResult.length === 0 ?
                    <p className="p-3 font-semibold rounded-lg">
                        Không tìm thấy thông tin...
                    </p> :
                    <ul className="mt-2">
                        {searchResult.map(item => (
                            <Link to={`/profile/${item._id}`} key={item._id}>
                                <li className="p-3 font-semibold rounded-lg hover:bg-bold-gray flex items-center">
                                    <Wrap>
                                        <Avatar size='sm' src={item.urlAvatar}></Avatar>
                                    </Wrap>
                                    <span className='ml-2'>{item.fullName} {item.studentCode || item.teacherCode}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
            }
        </>
    )
}
