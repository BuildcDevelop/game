// ✨ Přidáváme validaci vstupu pro přihlášení
// 📁 backend/src/utils/validate.ts
export const validateLoginInput = (username, password) => {
    const errors = [];
    if (!username || typeof username !== 'string') {
        errors.push('Uživatelské jméno je povinné');
    }
    if (!password || typeof password !== 'string') {
        errors.push('Heslo je povinné');
    }
    return errors;
};
