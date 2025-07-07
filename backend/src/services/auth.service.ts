// backend/src/services/auth.service.ts
const users: any[] = [];

export const AuthService = {
  findUser: (username: string) => users.find(u => u.username === username),
  createUser: (username: string, password: string) => {
    const newUser = {
      id: users.length + 1,
      username,
      password,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  }
};