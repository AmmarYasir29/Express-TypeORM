import { Request, Response } from "express";
import { okRes, errRes, getOTP } from "../../helpers/tools";
import * as validate from "validate.js";
import validation from "../../helpers/validation.helper";
import { User } from "../../src/entity/User";
import PhoneFormat from "../../helpers/phone.helper";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt";
/**
 *  any thinge use in ts must download @type   with add to it -d
 * any library that depend on project must add to it -s 
 * 
 */
export default class UserController {
  /**
   *
   * @param req
   * @param res
   */
  static async register(req: Request, res: Response): Promise<object> {
    let notValid = validate(req.body, validation.register());
    if (notValid) return errRes(res, notValid);
    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${req.body.phone} is not a valid`);
      let user: any;

    try {
      user = await User.findOne({ where: { phone: req.body.phone } });
      if (user) return errRes(res, `Phone ${req.body.phone} already exists`);
    } catch (error) {
      return errRes(res, error);
    }
    
    user = await User.create({
      ...req.body,
      active: true,
      complete: false,
      otp: getOTP(),
    });
    
    // TODO: Hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);    
    //Store hash in your password DB.
    user.password= password;
    await user.save();
    
    // TODO: create JWT Token
    console.log("user id: "+user.id);
    let token = jwt.sign({ id:user.id }, '12345');
    console.log(token);
    
    //FIXME: req.header = token
    
    // TODO: send the SMS
    return okRes(res, { data: user });
  }
  static async otp(req,res){
    let isValid= validate(req.body,validation.otp());
    if(isValid) return errRes(res,isValid,403)
    let token = req.headers.token
    console.log(token);
    let payload:any
    try {
      payload = jwt.verify(token, '12345');
    } catch (error) {
      errRes(res,"token not valid");
    }
    let user = await User.findOne(payload.id);
    if(!user) return errRes(res,"user not found");
    if(user.otp.toString() !== req.body.otp.toString()) return errRes(res,"correct the otp")
    user.complete = true;
    await user.save();
    return okRes(res,user);
  }
}
