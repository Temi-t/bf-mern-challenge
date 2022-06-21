import jwt from "jsonwebtoken";

//before a user likes a post successfully, after clicking, that action is confirmed/denied through auth middleware(NEXT) and then the post can be liked successfully.
const authMiddleware = (req, res, next) => {
  //get the token to be verified before users can perform actions like deleting posts, liking posts etc.
  try {
    const token = req.headers.authorization.split(" ")[1];
    //since googleToken is > 500, the token < 500 is custom
    const isCustomAuth = token.length < 500;
    let decodedData;
    //for custom token
    if (token && isCustomAuth) {
      //get decoded token using the secret(to know which user is logged in)
      decodedData = jwt.verify(token, "secret_test_key");
      //store the id of the user's decoded data inside userId
      req.userId = decodedData?.id;
    } else {
      // for googleOauth token
      // NOTE: token is called "encodedToken" on the frontend
      decodedData = jwt.decode(token);
      //store sub in userId (sub is googles name for a specificId that differentiates every single google user)
      //"sub": "3141592653589793238", // The unique ID of the user's Google Account
      //Reference=>  https://developers.google.com/identity/gsi/web/reference/html-reference
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default authMiddleware;
