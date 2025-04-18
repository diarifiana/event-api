import { NextFunction, Request, Response } from "express";
import { changePasswordService } from "../services/profile/change-password-profile.service";
import { updateProfileService } from "../services/profile/update-profile.service";
import { deleteProfileService } from "../services/profile/delete-account-profile.service";

export const ChangePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id; // dari token
    const { oldPassword, newPassword } = req.body;

    const result = await changePasswordService(
      userId,
      oldPassword,
      newPassword
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id; // dari token

    const result = await updateProfileService(userId, req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
export const deleteProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id; // dari token

    const result = await deleteProfileService(userId);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
