import jwt from "jsonwebtoken";

class TokenUtil {
  generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }
}

export default new TokenUtil();
