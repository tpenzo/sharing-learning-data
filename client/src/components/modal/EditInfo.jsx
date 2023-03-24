import React, { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux'

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import showToast from "../../Api/showToast";
import AvatarUpdate from "../profile/AvatarUpdate";

function EditInfo(props) {

	const user = useSelector(state => state.auth.user)

	const [fullName, setFullName] = useState(user?.fullName);
	const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber)
	const [gender, setGender] = useState(user?.gender)
	const [address, setAddress] = useState(user?.address)
	const [fileAvatar, setFileAvatar] = useState(null);

	const { isOpen, onClose } = props;


	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			motionPreset="scale"
			size="2xl"
		>
			<ModalOverlay />
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
										className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
										type="text"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
									/>
								</div>
								<div>
									<div className="mb-2">Mã sinh viên *</div>
									<input
										className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
										type="text"
										value={user.studentCode}
										readOnly
									/>
								</div>
							</div>
						</div>
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
						<div className="mt-4">
							<div className="mb-2">Email *</div>
							<input
								className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
								type="text"
								value={user.email}
								readOnly
							/>
						</div>
						<div className="mt-4">
							<div className="mb-2">Số điện thoại</div>
							<input
								className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
								type="text"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
						<div className="mt-4">
							<div className="mb-2">Địa chỉ</div>
							<input
								className="bg-gray-50 block w-full mt-1 border outline-none border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
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
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label
										htmlFor="female"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Nữ
									</label>
								</div>
								<div className="flex items-center mb-4">
									<input
										id="female"
										type="radio"
										value="other"
										name="gender"
										onChange={() => setGender("other")}
										checked={gender === 'other'}
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label
										htmlFor="female"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Khác
									</label>
								</div>
							</div>
						</div>
					</div>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3}>
						Cập nhật
					</Button>
					<Button onClick={onClose}>Huỷ</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default EditInfo;
