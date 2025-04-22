import { StatusCodes } from 'http-status-codes';
import userRepo from '../repositories/userRepository.js';
import { generateTokens, verifyRefreshToken } from '../utils/generateToken.js';
import bcrypt from 'bcrypt';

export const auth = async (req, res) => {
    const { email, password } = req.body;

    const user = await userRepo.findByEmail(email);
    if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken } = generateTokens(user.userId);

    res
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        .status(StatusCodes.OK)
        .json({
            status: 'success',
            user: {
                userId: user.userId,
                firstname: user.firstname,
                pic: user.pic,
            },
            accessToken
        });
}

export const refreshToken = (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing refresh token' });
    console.log(refreshToken)
    const userId = verifyRefreshToken(refreshToken);
    console.log(userId)
    if (!userId) return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid or expired refresh token' });

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(userId);

    res
        .cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 24 * 60 * 60 * 1000
        })
        .status(StatusCodes.OK)
        .json({
            status: 'success',
            message: 'Token Refreshed.',
            accessToken
        });
}

export const validate = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED); // Required by NGINX to block request
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.setHeader('X-User-Id', decoded.userId);
        return res.sendStatus(StatusCodes.OK);
    } catch (err) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    });

    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Logged out successfully.',
    });
}
