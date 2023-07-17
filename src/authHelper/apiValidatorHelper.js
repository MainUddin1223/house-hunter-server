

const apiValidator =(validationSchema,type)=> async (
  req,
  res,
  next
) => {
  console.log('-----------------------',validationSchema)
  const { error } = await validationSchema.validate(req.body);
  if (error) {
    console.log(error)
    next(error);
  }
  next();
};

export default apiValidator ;
