import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "thisKeyIsSupposedToBeSecret");

      req.userId = decodedData?.userId;

      console.log(req.userId);
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
      //   console.log(req.userId);
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

export default auth;
