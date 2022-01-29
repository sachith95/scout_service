import to from "await-to-js";
import FavoriteModel from "../../../../schemas/favorite-model";

/**
 * Get `Favorite` by `query`
 * @description Get all `Favorite` by `query`
 */
export const fetchFavoriteDetails = async (user) => {
  const [error, favoriteDetails] = await to(
    FavoriteModel.find(
      {
        createdBy: user._id,
      },
      {
        _id: 0,
        __v: 0,
      }
    ).lean()
  );
  if (error) {
    return Promise.reject(error);
  }
  return favoriteDetails;
};

/**
 * Create `Favorite Collection` by `query`
 * @description Create `Favorite Collection` by `query`
 */

 export const createFavoriteCollection = async (user, body) => {
  const name = body.name;
  console.log(user);
  const [error, favoriteCollection] = await to(
    FavoriteModel.create({
      createdBy: user._id,
      name: name,
    })
  );
  if (error) {
    return Promise.reject(error);
  }
  return favoriteCollection;
};





/**
 * Add `Favorite` by `query`
 * @description update favorite collection
 */

export const addFavoriteDetails = async (user, body) => {
  console.log(body);
  const [error, favoriteDetails] = await to(
    FavoriteModel.findOneAndUpdate(
      {
        createdBy: user._id,
        name: body.name,
      },
      {
        $push: {
          restaurantId: body._id,
        },
      },
    ).lean()
  );
  if (error) {
    return Promise.reject(error);
  }
  return favoriteDetails;
}