export const showNameChat = (chat, idUser) => {
    if(chat.name)
        return chat.name
    const user = chat.participant.find(user => user._id !== idUser)
    return user.fullName
}


export const showImageChat = (chat, idUser) => {
    if(chat.name)
        return chat.name
    const user = chat.participant.find(user => user._id !== idUser)
    return user.urlAvatar
}

export const showCode = (chat, idUser) => {
    if(chat.name)
        return chat.name
    const user = chat.participant.find(user => user._id !== idUser)
    return user.teacherCode || user.studentCode
}