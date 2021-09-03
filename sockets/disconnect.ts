import {disconnectUser} from "../utils/users";

module.exports = (io: any, socket: any) => {
    socket.on("disconnect", () => {
        const tempUser = disconnectUser(socket.id);

        if(tempUser) {
          io.broadcast.to(tempUser.room).emit("message", {
            userId: tempUser.id,
            username: tempUser.name,
            text: `${tempUser.name} left the chat`
          })
        }
        
    });
}