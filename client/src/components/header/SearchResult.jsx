import { Avatar, Wrap } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchResult({ searchResult }) {
    return (
        <>
            {
                searchResult?.userList?.length === 0 && searchResult?.postList?.length === 0  ?
                    <p className="p-3 font-semibold rounded-lg">
                        Không tìm thấy thông tin...
                    </p> :
                    <ul className="mt-2">
                        {searchResult?.userList?.map(item => (
                            <Link to={`/profile/${item._id}`} key={item._id}>
                                <li className="p-3 font-semibold rounded-lg hover:bg-bold-gray flex items-center">
                                    <div className="w-full flex flex-col bg-white pb-4 pt-1 px-5 rounded-lg shadow-sm h-auto">
                                        <div className="flex items-center gap-4 justify-between mt-5 flex-wrap-reverse">
                                             <div className="flex items-center gap-3">
                                                <Wrap>
                                                    <Avatar size="sm" src={item?.urlAvatar}></Avatar>
                                                </Wrap>
                                                <div>
                                                     <p className='font-bold'>
                                                            {item.fullName +
                                                            " " +
                                                            `${
                                                                item?.studentCode
                                                                ? item?.studentCode
                                                                : item?.teacherCode
                                                            }`}
                                                        </p>
                                                </div>
                                             </div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                        {searchResult?.postList?.map(item => (
                            <Link to={`/post/${item?._id}`} key={item._id}>
                                <li className="p-3 text-xs rounded-lg hover:bg-bold-gray flex items-center">
                                    {/* <span className='ml-2'>{item.title}</span> */}
                                    <div className="w-full flex flex-col bg-white pb-4 pt-1 px-5 rounded-lg shadow-sm h-auto">
                                         <div className="flex items-center gap-4 justify-between mt-5 flex-wrap-reverse">
                                            <div className="flex items-center gap-3">
                                                <Wrap>
                                                    <Avatar size="sm" src={item?.author?.urlAvatar}></Avatar>
                                                </Wrap>
                                                <div>
                                                    <p className='font-bold'>
                                                        {item?.author?.fullName +
                                                        " " +
                                                        `${
                                                            item.author?.studentCode
                                                            ? item?.author?.studentCode
                                                            : item?.author?.teacherCode
                                                        }`}
                                                    </p>
                                                </div>
                                            </div>
                                         </div>
                                        <div className="title">
                                           <p className="mt-5 pl-1 text-base cursor-pointer hover:font-semibold  whitespace-nowrap overflow-ellipsis overflow-hidden">
                                                {item?.title}
                                            </p>
                                        </div>
                                        <div>
                                            <div
                                                className="mt-2 translate-y-2 text-[10px] inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" style={{fill: 'rgba(0, 0, 0, 1)', transform: '', msfilter: ''}}><path d="M17.868 4.504A1 1 0 0 0 17 4H3a1 1 0 0 0-.868 1.496L5.849 12l-3.717 6.504A1 1 0 0 0 3 20h14a1 1 0 0 0 .868-.504l4-7a.998.998 0 0 0 0-.992l-4-7zM16.42 18H4.724l3.145-5.504a.998.998 0 0 0 0-.992L4.724 6H16.42l3.429 6-3.429 6z" /></svg>
                                                    <span className="ml-1">{item.tag}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
            }
        </>
    )
}
