import { jwtHelpers } from "./jwtHelper.js";
import config from '../config/index.js'

const verifyAuth = async (req,res,next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
          const accessToken = token.split(' ')[1]
        const decoded = jwtHelpers.verifyToken(
            accessToken,
          config.jwt_access_secret
        );
        req.user = decoded;
      } catch (error) {
        next(error);
      }
    next();
}
export {verifyAuth}