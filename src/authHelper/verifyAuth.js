import { jwtHelpers } from "./jwtHelper.js";

const verifyAuth = async (req,res,next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
          const accessToken = token.split(' ')[0]
        const decoded = jwtHelpers.verifyToken(
            accessToken,
          config.jwt.jwt_access_secret
        );
        req.user = decoded;
        next();
      } catch (error) {
        next(error);
      }

    next();
}
export {verifyAuth}