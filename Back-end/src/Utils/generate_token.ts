import Jwt from "jsonwebtoken";

export const generateToken = (id: string): string | undefined =>
{
    const JwtSecretKey = process.env.JWT_SECRET_KEY;
    const dataToAssign = {id: id,};

    if(dataToAssign.id && JwtSecretKey){
        const token = Jwt.sign(dataToAssign, JwtSecretKey);
        return token;
    }else{
        return undefined;
    }
};