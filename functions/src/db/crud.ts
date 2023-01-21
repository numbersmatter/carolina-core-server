import { NextFunction, Request, RequestHandler, Response } from "express";
import { db } from "../firebase";


const createNewDoc: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const newQuestionRef = db.collection("questions").doc();

  const requestBody = req.body;
  const { collectionPath, docData } = requestBody;

  try {
    const newDocRef = db.collection(collectionPath).doc();

    const saveProperty = await newDocRef.create(docData);
    return res.status(200).json({
      docId: newDocRef.id,
      writeTime: saveProperty.writeTime.valueOf(),
    });
  } catch (error) {
    return res.status(400).json( {
      error: error,
    });
  }
};
const setDocData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const newQuestionRef = db.collection("questions").doc();

  const sentData = req.body;
  const { collectionPath, docId, docData } = sentData;

  try {
    const docPath = `${collectionPath}/${docId}`;
    const docRef = db.doc(docPath);

    const saveDoc = await docRef.set(docData);
    return res.status(200).json({
      docId: docRef.id,
      writeTime: saveDoc.writeTime.valueOf(),
    });
  } catch (error) {
    return next(error);
  }
};
const updateDocData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const newQuestionRef = db.collection("questions").doc();

  const sentData = req.body;
  const { collectionPath, docId, docData } = sentData;

  try {
    const docPath = `${collectionPath}/${docId}`;
    const docRef = db.doc(docPath);

    const saveDoc = await docRef.update(docData);
    return res.status(200).json({
      docId: docRef.id,
      writeTime: saveDoc.writeTime.valueOf(),
    });
  } catch (error) {
    return next(error);
  }
};
const getDocData: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const newQuestionRef = db.collection("questions").doc();

  const sentData = req.body;
  const { collectionPath, docId } = sentData;

  try {
    const docPath = `${collectionPath}/${docId}`;
    const docRef = db.doc(docPath);

    const getDoc = await docRef.get();
    return res.status(200).json({
      docId: docRef.id,
      docExits: getDoc.exists,
      docData: getDoc.data() ?? {},
    });
  } catch (error) {
    return next(error);
  }
};
const getCollection: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const newQuestionRef = db.collection("questions").doc();

  const sentData = req.body;
  const { collectionPath } = sentData;

  try {
    const collectionDocs = db.collection(collectionPath);

    const query = await collectionDocs.get();
    const docsArray = query.docs.map((doc)=> {
      const docData = { ...doc.data(), docId: doc.id};
      return docData;
     });
    return res.status(200).json({
      docsArray,
    });
  } catch (error) {
    return next(error);
  }
};

export { createNewDoc, getDocData, setDocData, updateDocData, getCollection };
