interface User {
    id: string,
    name: string,
    room: string
}

const users: User[] = [];

export const joinUser = (id: string, name: string, room: string) => {

    const tempUser: User = {id, name, room}; 
    users.push(tempUser);

    return tempUser;
}

export const disconnectUser = (id: string) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

export const getUserById = (id: string) => {
    return users.find((user) => user.id === id);
}
