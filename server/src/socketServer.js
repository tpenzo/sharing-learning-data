let users = []

const socketServer = (socket) => {
    // Join user
    socket.on('joinUser',(_id) => {
        users.push({_id, socketId: socket.id})
        console.log(users)
    })

    // Disconnect user
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
    })

    // Follow user
    socket.on('follow', (userFollowed) => {
        const user = users.find(user => user._id === userFollowed)
        const byUser = users.find(user => user.socketId === socket.id)
        if(user){
            socket.to(user.socketId).emit('followToClient', byUser._id)
        }
    })

    // UnFollow user
    socket.on('unFollow', (userUnFollow) => {
        const user = users.find(user => user._id === userUnFollow)
        const byUser = users.find(user => user.socketId === socket.id)
        if(user){
            socket.to(user.socketId).emit('unFollowToClient', byUser._id)
        }
    })
}


export default socketServer