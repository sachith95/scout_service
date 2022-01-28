/**
 * 
 * @param {*} logObject 
 * @param {*} user 
 * @param {*} action 
 * @param {*} category 
 * @param {*} message 
 */
export const addLog = (logObject, {email}, action, category, message) => {
  logObject.log({
    action: action,
    category: category,
    createdBy: email,
    message: message,
  });
};
