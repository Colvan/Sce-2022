import { Request, Response } from "express";

import Profile from "../models/user_profile_model";
import { CtrlReq, CtrlRes } from "../common/req_res_wrapper";

/**
 * Create new post
 * @param {http request} req
 * @param {http response} res
 */
export const updateProfile = async (
  req: Request | CtrlReq,
  res: Response | CtrlRes
) => {
  console.log(req.body);
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const image = req.body.imageUrl;
  const post = new Profile({
    firstName: firstName,
    lastName: lastName,
    imageUrl: image,
    email: email,
  });

  try {
    await post.save();
    res.status(200).send({
      firstName: firstName,
      lastName: lastName,
      imageUrl: image,
      email: email,
    });
  } catch (err) {
    res.status(400).send({
      err: err.message,
    });
  }
};



/**
 * Get posts written by the specified user
 * @param {http request} req
 * @param {http response} res
 */
 export const getUserProfile = async (req: Request , res: Response ) => {
    const email = req.params.email;
    if(!email) {
      return res.status(400).send("no user email provided")
    }
    try {
      const profile = await Profile.find({ email: email })
      if(!profile || profile.length <= 0) {
        res.status(200).send("No posts by user found")
      } else {
        return res.status(200).send(profile)
      }
    } catch (err) {
      res.status(400).send( {err: err.message})
    }
  }