import React, { useState } from 'react';

function AvatarUpdate({ urlAvatar, setFileAvatar }) {

    const [avatarUrl, setAvatarUrl] = useState(urlAvatar);
    const [file, setFile] = useState(null);

    const handleInputChange = (event) => {
        setAvatarUrl(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
    }

    return (
        <div className="flex items-center">
            <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                    <img src={avatarUrl} alt="Current avatar" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <label htmlFor="avatarInput"
                        className="flex justify-center items-center cursor-pointer w-full h-full rounded-full" />
                    <input
                        type="file"
                        id="avatarInput"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={handleInputChange}
                    />
                    <label htmlFor="avatarInput" className='absolute -bottom-2 px-4 pb-1  rounded-full bg-red-600 text-white text-xs'>
                        Chỉnh sửa
                    </label>
                </div>
            </div>
        </div>
    );
}

export default AvatarUpdate;
