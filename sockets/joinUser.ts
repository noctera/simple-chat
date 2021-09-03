import {joinUser} from "../utils/users";

interface joinRoomProps {
  username: string,
  room: string
}

module.exports = (io: any, socket: any) => {
	socket.on("joinRoom", ({username, room}: joinRoomProps) => {
      const tempUser = joinUser(socket.id, username, room);
      socket.join(room);

      // send message to user who joined
      socket.emit("message", {
        userId: tempUser.id,
        username: "Bot",
        text: `You are now in the ${tempUser.room} room`
      })

      //send notify message to other users that are in the same room
      console.log("sending message");
      socket.broadcast
      .to(tempUser.room)
      .emit("message", {
        userId: tempUser.id,
        username: "Bot",
        text: `${tempUser.name} has joined the chat`
      })
    })
}