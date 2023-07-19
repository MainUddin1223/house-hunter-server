import ApiError from "../../errorHandler/apiErrorHandler.js";
import catchAsync from "../../errorHandler/catchAsyncHandler.js";
import verifyFilterOptions from "../../utils/filterOptions.js";
import calculatePaignation from "../../utils/pagination.js";
import House from "./house.model.js";

const getAllHouse = catchAsync(async (req, res) => {
  const {
    searchTerm,
    page,
    limit,
    sortBy,
    sortOrder,
    minRent,
    maxRent,
    ...filtersData
  } = req.query;
  
  const paginationOptions = { searchTerm, page, limit, sortBy, sortOrder };

  // Pagination
  const pagination = calculatePaignation(paginationOptions);

  // Filter data
  const filterOptions = ['city', 'bedrooms', 'bathrooms', 'roomSize', 'isBooked'];
  const identifyFilterOptions = verifyFilterOptions(filtersData, filterOptions);

  const andCondition = [];

  // Filter options with minRent and maxRent
  if (minRent || maxRent) {
    const rentRangeCondition = {};
    if (minRent) {
      rentRangeCondition.$gte = minRent;
    }
    if (maxRent) {
      rentRangeCondition.$lte = maxRent;
    }
    andCondition.push({ rent: rentRangeCondition });
  }

  // Other filter options
  if (Object.keys(identifyFilterOptions).length) {
    andCondition.push({
      $and: Object.entries(identifyFilterOptions).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition = {};
  
  if (pagination.sortBy && pagination.sortOrder) {
    sortCondition[pagination.sortBy] = pagination.sortOrder;
  }

  // Search data
  if (searchTerm) {
    andCondition.push({
      $or: ['name', 'city', 'address'].map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  
  const houses = await House.find(whereCondition)
    .sort(sortCondition)
    .skip(pagination.skip)
    .limit(pagination.limit);
  
  const total = await House.countDocuments(whereCondition);

  if (houses) {
    res.status(200).json({
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
      },
      data: houses,
    });
  } else {
    res.status(404).json({ msg: "Not found" });
  }
});

const getHouseById = catchAsync(async (req, res) => {
  const {id} = req.params
 const result = await House.findOne({_id:id})
 if(!result){
  throw new ApiError('404','House not found')
 }
  res.status(200).json(result);
});


  export const houseController = {getAllHouse,getHouseById}