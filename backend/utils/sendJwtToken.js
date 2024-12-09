const sendJwtToken = async (res,user,message) => {
    const token = await user.generateJwtToken();
    console.log("no",token);
    const cookieOptions = {
        expires:new Date(
            Date.now() + process.env.cookieExpire * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
    };
    res.status(200).cookie("token",token,cookieOptions).json({
                            success:true,
                            message,
                            user,
                            token
                          });
}

export default sendJwtToken;