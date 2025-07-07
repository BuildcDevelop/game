import { validateLoginInput } from '../utils/validate';

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const validationErrors = validateLoginInput(username, password);
  if (validationErrors.length > 0) {
    return res.status(400).json({ message: 'Chybná data', errors: validationErrors });
  }

  const user = AuthService.findUser(username);
  if (!user) return res.status(404).json({ message: 'Uživatel nenalezen' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Neplatné heslo' });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: '2h' }
  );
  return res.status(200).json({ message: 'Přihlášen', token });
};
