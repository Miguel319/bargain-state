import User from '../../models/User';
import jwt from 'jsonwebtoken';


export default async (req, res) => {
    try {
        const { userId } = getToken(req);
        const users = await User.find({ _id: { $ne: userId }})
                .sort({ role: 'asc'});
        res.status(200).json(users);
    } catch (e) {
        catchErr(e, res);
    }
};

const getToken = (req) => jwt
    .verify(req.headers.authorization, process.env.JWT_SECRET);

const catchErr = (e, res) => {
    console.error(e);
    res.status(403).send('Please login again');
}