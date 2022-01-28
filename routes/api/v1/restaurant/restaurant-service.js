import to from "await-to-js";
import RestaurantModel from "../../../../schemas/restaurant-model";
import { addLog } from "../../../../utils/helper";

/**
 * Get notes by status
 * @description Get all notes byt status and user id
 */
export const fetchRestaurants = async (query) => {
  const [error, note] = await to(
    RestaurantModel.find(
      
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


/**
 * Toggle Archive note
 * @description Archive note
 */
export const toggleArchiveNote = async (id, user) => {
  const [error, note] = await to(NoteModel.find({ id: id }).lean());

  if (error) {
    return Promise.reject(error);
  }

  const query = { id: id };
  const validate = {
    archived: !note[0].archived,
  };
  const [error2, note2] = await to(NoteModel.findOneAndUpdate(query, validate));

  if (error2) {
    return Promise.reject(error2);
  }
  console.log(note2);
  const sanitizedNote = sanitizeNote(note2);

  addLog(note2, user, "update", "note", "Update Archive Status");

  return [sanitizedNote];
};

function sanitizeNote(note) {
  return {
    id: note.id,
    title: note.title,
    text: note.text,
    archived: note.archived,
  };
}
