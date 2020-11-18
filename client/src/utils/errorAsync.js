export const sendError = (err) => {
  console.log(err);
  if (err.response) {
    const { data, status } = err.response;

    if (status > 399) throw data.message;
  }
};
