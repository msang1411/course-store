const { JWT_SECRET, REFRESH_TOKEN_SECRET } = require("../configs/index");
const JWT = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const client = require("../db/connections_redis");

const encodeToken = (accountId) => {
  try {
    return JWT.sign(
      {
        iss: "Pham Minh Sang",
        sub: accountId,
        // iat: Date().now(),
        // exp: Date().now() + 20,
      },
      JWT_SECRET,
      {
        expiresIn: "3 days",
      }
    );
  } catch (error) {
    throw new ApiError(402, error.message);
  }
};

// refresh token
const signRefreshToken = async (accountId) => {
  return new Promise((resolve, reject) => {
    JWT.sign(
      {
        iss: "Pham Minh Sang",
        sub: accountId,
        // iat: new Date().getTime(),
        // exp: new Date().setFullYear(new Date().getFullYear() + 1),
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30 days",
      },
      async (err, token) => {
        if (err) reject(new ApiError(403, err.message));
        await client.connect();
        await client.set(accountId.toString(), token, {
          EX: 365 * 24 * 60 * 60,
        });
        await client.quit();
        resolve(token);
      }
    );
  });
};

// verify token
const verifyAccessToken = (req, res, next) => {
  if (!req.headers.authorization)
    return next(new ApiError(401, "Unauthorized"));
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  // start verify token
  JWT.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "JsonWebTokenError")
        return next(new ApiError(401, "Unauthorized"));
      // Error token expired
      return next(new ApiError(402, err.message));
    }
    req.payload = payload;
    next();
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          console.log(err.message);
          return reject(new ApiError(401, "Unauthorized"));
        }
        // Error token expired
        reject(new ApiError(402, err.message));
      }
      await client.connect();
      const data = await client.get(payload.sub);
      await client.quit();
      if (refreshToken === data) return resolve(payload);
      reject(new ApiError(402, "Unauthorized"));
    });
  });
};

module.exports = {
  encodeToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
