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
                                    <img className="w-10 rounded-full" src={item.urlAvatar} alt="avatar" />
                                    <span className='ml-2'>{item.fullName}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>
            }
        </>
    )
}
