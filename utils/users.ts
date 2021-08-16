interface User {
    id: number,
    name: string,
    room: string
}

const users: User[] = [];

const joinUser = (id: number, name: string, room: string) => {

    const tempUser: User = {id, name, room}; 
    users.push(tempUser);

    return tempUser;
}

const disconnectUser = (id: number) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUserById = (id: number) => {
    return users.find((user) => user.id === id);
}

module.exports = {
    joinUser,
    disconnectUser,
    getUserById,
}