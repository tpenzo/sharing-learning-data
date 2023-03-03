import React from 'react'
import Header from '../components/header/Header'

export default function ChatPage() {
    return (
        <div className="container xl mx-auto h-screen items-center self-center flex flex-col">
            <header className="header sticky top-0 w-full h-[12%] max-h-full rounded-t-lg z-50">
                <Header />
            </header>
            <div className="main-content w-full h-[87%] pt-4 flex flex-row justify-around gap-5 bg-white/60 rounded-b-lg z-0">
                {/* user list and search */}
                <div className="basis-1/5 max-w-[19%] max-h-full h-full self-start sticky top-28 bg-light-gray/70 rounded-lg bg-light-gray">
                    <div className="border-b-2 py-4 px-2">
                        <input
                            type="text"
                            placeholder="search chatting"
                            class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                        />
                    </div>
                    <div>
                        <div class="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                            <div class="w-1/4">
                                <img
                                    src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                                    class="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div class="w-full">
                                <div class="text-lg font-semibold">Luis1994</div>
                                <span class="text-gray-500">Pick me at 9:00 Am</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* message */}
                <div className="basis-3/5 overflow-y-auto bg-light-gray">
                    <div class="flex flex-col flex-auto h-full p-6">
                        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                            <div class="flex flex-col h-full overflow-x-auto mb-4">
                                <div class="flex flex-col h-full">
                                    <div class="grid grid-cols-12 gap-y-2">
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>Hey How are you today?</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing
                                                        elit. Vel ipsa commodi illum saepe numquam maxime
                                                        asperiores voluptate sit, minima perspiciatis.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>I'm ok what about you?</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>Lorem ipsum dolor sit amet !</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                                    </div>
                                                    <div
                                                        class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                                                    >
                                                        Seen
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div
                                                    class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                >
                                                    A
                                                </div>
                                                <div
                                                    class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Perspiciatis, in.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                <div>
                                    <button
                                        class="flex items-center justify-center text-gray-400 hover:text-gray-600"
                                    >
                                        <svg
                                            class="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex-grow ml-4">
                                    <div class="relative w-full">
                                        <input
                                            type="text"
                                            class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                        />
                                        <button
                                            class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                        >
                                            <svg
                                                class="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <button
                                        class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                    >
                                        <span>Send</span>
                                        <span class="ml-2">
                                            <svg
                                                class="w-4 h-4 transform rotate-45 -mt-px"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* info chat */}
                <div className=" basis-1/5 h-full max-w-[20%] max-h-full sticky self-start bg-light-gray rounded-lg z-1">
                    <div className="flex flex-col p-3">
                        <div className="font-semibold text-xl py-4">CT113 - Nhập môn trí tuệ nhân tạo</div>
                        <img
                            src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                            className="object-cover rounded-xl h-64"
                            alt=""
                        />
                        <div className="font-semibold py-4">Created 22 Sep 2021</div>
                        <div className="font-light">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
                            perspiciatis!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
