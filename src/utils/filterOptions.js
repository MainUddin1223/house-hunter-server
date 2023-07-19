const verifyFilterOptions = (
    object,
    keys
  )=> {
    const finalObject = {};
    for (const key of keys) {
      if (object && Object.hasOwnProperty.call(object, key)) {
        finalObject[key] = object[key];
      }
    }
    return finalObject;
  };
  export default verifyFilterOptions