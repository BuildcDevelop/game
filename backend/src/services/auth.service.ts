// ✅ CÍL: Ručně vytvořit 1 testovacího uživatele (admin) a ověřit přihlášení + získání JWT
// To bude náš vstupní bod do hry.

// 📁 backend/src/services/auth.service.ts

const users: any[] = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$ABCDEFGH...', // ← hash hesla 'admin123', vygenerujeme níže
    createdAt: new Date()
  }
];

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
  },
};


// 🧪 KROK: Vygeneruj hash hesla 'admin123' pomocí bcrypt
// Spusť krátký Node.js skript v rootu projektu (nebo pomocí ts-node):

const bcrypt = require('bcryptjs');
bcrypt.hash('admin123', 10).then(console.log);

// Výstup (např.):
// $2a$10$9oZQrfs90n/ZMN3A5QJc0.kT.zK5K3Q9nYtYa0hDIDUpfIClJG7gK

// Tento hash pak vlož do users[] jako hodnotu `password`

// 🧪 TEST v Postman:
// POST http://localhost:3001/api/auth/login
// Body:
// {
//   "username": "admin",
//   "password": "admin123"
// }

// ✅ Odpověď:
// {
//   "message": "Přihlášen",
//   "token": "<JWT>"
// }
