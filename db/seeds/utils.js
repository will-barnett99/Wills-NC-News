const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};


exports.createLookupRef = (articleData, currentKey, targetKey) => {
  const ref =  {};

  articleData.forEach((article) => {
    const currentValue = article[currentKey];
    ref[currentValue] = article[targetKey];
  });
  return ref;
}


