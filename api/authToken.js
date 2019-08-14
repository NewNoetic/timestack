import auth from '../lib/auth';

export default async (req, res) => {
    const { tokens } = await auth.getToken(req.body.code);
    // auth.setCredentials(tokens);
    res.json(tokens);
};