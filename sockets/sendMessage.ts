import {getUserById} from "../utils/users";

interface messageSentProps {
  message: string
}


module.exports = (io: any, socket: any) => {
	socket.on("messageSent", ({message}: messageSentProps) => {
      //find username by the socket id
      const tempUser = getUserById(socket.id);
      console.log(tempUser);

      socket.to(tempUser.room).emit("message", {
        userId: tempUser.id,
        username: tempUser.name,
        text: message
      })
    })
}