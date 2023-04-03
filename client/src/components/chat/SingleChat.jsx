import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import SenderMessage from "./SenderMessage";
import ReceivedMessage from "./ReceivedMessage";
import { fetchMessagesAPI, sendMessageAPI } from '../../Api/messageAPI';

export default function SingleChat() {

	const { auth, chat, socketInstance } = useSelector(state => state)
	const { selectedChat } = chat
	const { socket } = socketInstance

	const [messages, setMessages] = useState([])
	const [message, setMessage] = useState('')

	// Scroll
	const bottomAnchor = useRef();
	const scrollToBottom = () => {
		bottomAnchor.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, []);

	//while messages list change, scroll to bottom 
	useEffect(() => {
		scrollToBottom()
	}, [messages]);


	const fetchMessage = async () => {
		if (!selectedChat)
			return;
		const data = await fetchMessagesAPI(selectedChat._id)
		setMessages(data)
	}

	useEffect(() => {
		fetchMessage()
	}, [selectedChat])

	console.log(messages)

	useEffect(() => {
		socket?.on('receiveMessage', newMessage => {
			if (newMessage.chatId === selectedChat?._id) {
				setMessages([...messages, newMessage])
			}
		})
	})


	const sendMessage = async () => {
		if(message){
			const newMessage = await sendMessageAPI({
				sender: auth.user._id,
				content: message,
				chatId: selectedChat._id
			})
			if (newMessage) {
				// Get list _id of recipient
				const receiverIds = selectedChat.participant
					.filter(user => user._id !== auth.user._id)
					.map(user => user._id);
				// Socket
				socket?.emit('sendMessage', { message: newMessage, receiverIds })

				setMessages([...messages, newMessage])
			}
			setMessage('')
		}
	}

	const handleEnterSendMessage = (e)=>{
		if(e.key === "Enter"){
			sendMessage()
		}
	}


	return (
		<>
			{
				selectedChat ? (
					<div className="flex flex-col flex-auto h-full p-2">
						<div className="flex flex-col flex-auto flex-shrink-0 rounded-lg bg-gray-50 h-full px-1 pt-1 pb-1">
							<div className="flex flex-col h-full overflow-x-auto mb-2">
								<div className="flex flex-col h-full">
									{
										messages.length === 0 ?
											(<div className="flex justify-center items-center flex-col mt-7">
												<img className='w-1/2' src='../assets/no-messages.png' />
												<span className='-mt-2 text-xl text-blue-400'>Bạn chưa có tin nhắn nào.</span>
											</div>)
											:
											<div className="grid grid-cols-12 gap-y-2">
												{
													messages.map(
														message => message.sender._id === auth.user._id
															? <SenderMessage message={message} key={message._id} />
															: <ReceivedMessage message={message} key={message._id} />
													)
												}
											</div>
									}
									<div ref={bottomAnchor} className="anchor-bottom"></div>
								</div>
							</div>

							{/* input chat */}
							<div className="flex flex-row items-center h-16 rounded-lg bg-white w-full px-4">
								<div>
									<button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
											></path>
										</svg>
									</button>
								</div>
								<div className="flex-grow ml-4">
									<div className="relative w-full">
										<input
											value={message}
											placeholder='Aa'
											onChange={(e) => setMessage(e.target.value)}
											onKeyDown={handleEnterSendMessage}
											type="text"
											className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 pr-10 h-10"
										/>
										<button
											className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
											<svg
												className="w-6 h-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												></path>
											</svg>
										</button>
									</div>
								</div>
								<div className="ml-4">
									<button
										onClick={sendMessage}
										className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
										<span>Gửi</span>
										<span className="ml-2 translate-y-1">
											<box-icon color="white" name='send'></box-icon>
										</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				) : (
						<div className="flex flex-col justify-center items-center h-full -mt-6">
							<div className="">
								<img className='w-1/2 h-auto mx-auto' src="../assets/empty-message.jpg" alt="empty msg" />
							</div>
							<div className="-mt-5">
								<span className='text-blue-400 font-semibold text-lg'>
									Chọn tên người dùng hoặc nhóm học để bắt đầu nhắn tin.
								</span>
							</div>
						</div>
				)
			}
		</>

	)
}
