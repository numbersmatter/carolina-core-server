import { NextFunction, Request, RequestHandler, Response } from "express";
import { db } from "../firebase";

const createProperty: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const newQuestionRef = db.collection("questions").doc();

  const sentData = req.body;
  const { collectionPath, docData} = sentData;

  try {
    const newDocRef = db.collection(collectionPath).doc();

    const saveProperty = await newDocRef.create(docData);
    return res.status(200).json({
      newDocId: newDocRef.id,
      writeTime: saveProperty.writeTime.valueOf(),
    });
  } catch (error) {
    return next(error);
  }
};


export {
  createProperty,
};
