import to from "await-to-js";
import RestaurantModel from "../../../../schemas/restaurant-model";

/**
 * Get `Restaurant` by `query`
 * @description Get all `Restaurant` by `query`
 */
export const fetchRestaurants = async (query) => {
  // opening_hours: Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm
  // name: "The Restaurant",
  // st : start timestamp = Fri Jan 28 2022 19:30:00 GMT+0530
  // et : end timestamp = Fri Jan 28 2022 20:30:00 GMT+0530
  console.log("wwwwwwwwww");
  const { name, timestamp } = JSON.parse(query);
  const dateQuery = likeQueryGenForDateRange(timestamp);
  console.log(dateQuery);
  const [error, restaurant] = await to(
    RestaurantModel.find(
      {
        name: { $regex: `.*${name}.*`, $options: "i" },
        ...dateQuery,
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
  return restaurant;
};

function likeQueryGenForDateRange(timestamp) {
  console.log(timestamp);
  try {
    const st = new Date(timestamp);
    const st_day = st.getDay();
    let st_hour = st.getHours();
    const st_min = st.getMinutes();
    var ampm = st_hour >= 12 ? "pm" : "am";
    st_hour = st_hour % 12 || 12;

    // query for all possible days in range
    const days = {
      0: "Sun",
      1: "Mon",
      2: "Tues",
      3: "Weds",
      4: "Thurs",
      5: "Fri",
      6: "Sat",
    };

    let day_flag = false;
    if (
      st_day === 1 ||
      st_day === 2 ||
      st_day === 3 ||
      st_day === 4 ||
      st_day === 5
    ) {
      day_flag = true;
    }
    console.log(day_flag);
    const day_query = {
      $or: [
        {
          opening_hours: {
            $regex: `.*${days[st_day]}.* ${st_hour}:${st_min} ${ampm}.*`,
          },
        },
        {
          opening_hours: {
            $regex: `.*${days[st_day]}.*`,
          },
        },
        {
          opening_hours: {
            $regex: `.*${days[st_day]}.* ${st_hour} ${ampm}.*`,
          },
        },
        {
          opening_hours: {
            $regex: day_flag
              ? `.*Mon-Sun.*`
              : `.*${days[st_day]}.* ${st_hour} ${ampm}.*`,
          },
        },
      ],
    };
    console.log(day_query);

    return day_query;
  } catch (error) {
    console.log(error);
    return {};
  }
}
