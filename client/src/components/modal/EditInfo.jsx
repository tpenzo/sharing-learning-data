import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	Button,
	Stack,
	Spinner,
	useDisclosure
} from "@chakra-ui/react";
import AvatarUpdate from "../profile/AvatarUpdate";
import { removeImage, uploadImg } from "../../utils/uploadDocs";
import { updateUserAPI } from "../../Api/userAPI";
import ChangePassword from "./ChangePassword";

function EditInfo(props) {
	const dispatch = useDispatch()

	const user = useSelector(state => state.auth.user)
	const changePassModal = useDisclosure()

	const [fullName, setFullName] = useState(user?.fullName);
	const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber)
	const [gender, setGender] = useState(user?.gender)
	const [address, setAddress] = useState(user?.address)
	const [fileAvatar, setFileAvatar] = useState(null);

	const { isOpen, onClose } = props;
	const [ isLoading, setIsLoading ] = useState(false)

	const handleEdit = async () => {
		setIsLoading(!isLoading)
		let url = null
		if (fileAvatar) {
			url = await uploadImg(fileAvatar) // upload new image
			await removeImage(user.urlAvatar) // remove old image
		}
		const newInfo = {
			fullName,
			phoneNumber,
			gender,
			address,
			urlAvatar: url ? url : user.urlAvatar
		}
		await updateUserAPI(user._id, newInfo, dispatch)
		setIsLoading(!isLoading)
		onClose()
	}


	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				motionPreset="scale"
				size="2xl"
			>
				<ModalOverlay/>
				<ModalContent>
					<ModalHeader>Chỉnh Sửa Thông Tin</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<div className="">
							<div className="flex justify-center gap-2">
								<div className="mt-4 mr-5">
									<AvatarUpdate urlAvatar={user.urlAvatar} setFileAvatar={setFileAvatar} />
								</div>
								<div className="mt-4 w-full">
									<div className="mb-3">
										<div className="mb-2">Họ và tên *</div>
										<input
											className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
											type="text"
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
											required
										/>
									</div>
									{
										user?.role === 'student' ? (
											<div>
												<div className="mb-2">Mã sinh viên *</div>
												<input
													className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
													type="text"
													value={user.studentCode}
													readOnly
												/>
											</div>
										) : (
											<div className="mt-4">
												<div className="mb-2">Email *</div>
												<input
													className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
													type="text"
													value={user.email}
													readOnly
												/>
											</div>
										)
									}
								</div>
							</div>
							{
								user?.role === 'student' && (
									<div className="flex justify-center gap-2">
										<div className="mt-4 w-1/2">
											<div className="mb-2">Ngành học *</div>
											<input
												className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
												type="text"
												value={user.major}
												readOnly
											/>
										</div>
										<div className="mt-4 w-1/2">
											<div className="mb-2">Lớp *</div>
											<input
												className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
												type="text"
												value={user.class}
												readOnly
											/>
										</div>
									</div>
								)
							}
							{
								user?.role === 'student' && (
									<div className="mt-4">
										<div className="mb-2">Email *</div>
										<input
											className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
											type="text"
											value={user.email}
											readOnly
										/>
									</div>
								)
							}
							<div className="mt-4">
								<div className="mb-2">Số điện thoại</div>
								<input
									className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
									type="text"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
								/>
							</div>
							<div className="mt-4">
								<div className="mb-2">Địa chỉ</div>
								<input
									className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
									type="text"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
							<div className="mt-4">
								<div className="mb-2">Giới tính</div>
								<div className="flex justify-start gap-3 mt-1">
									<div className="flex items-center mb-4">
										<input
											id="male"
											type="radio"
											value="male"
											name="gender"
											checked={gender === 'male'}
											onChange={() => setGender("male")}
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
										/>
										<label
											htmlFor="male"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Nam
										</label>
									</div>
									<div className="flex items-center mb-4">
										<input
											id="female"
											type="radio"
											value="female"
											name="gender"
											checked={gender === 'female'}
											onChange={() => setGender("female")}
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
										/>
										<label
											htmlFor="female"
											className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Nữ
										</label>
									</div>
								</div>
							</div>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							type="submit"
							colorScheme="blue" mr={3}
							onClick={handleEdit}
							isLoading={isLoading}
						>
							{isLoading ? 'Đang xử lý...' : 'Cập nhật'}
						</Button>
						<Button
							type="submit"
							colorScheme="red" mr={3}
							onClick={changePassModal.onOpen}
						>
							Đổi mật khẩu
						</Button>
						<Button onClick={onClose}>Huỷ</Button>
					</ModalFooter>
				</ModalContent>

				<ChangePassword isOpen={changePassModal.isOpen} onClose={changePassModal.onClose} />
			</Modal>
		</>
	);
}

export default EditInfo;
