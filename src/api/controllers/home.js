const homeCTRL = {
  getHome: (request, h) => {
    return h
      .response({
        status: 'success',
        message: 'Welcome to the PMS API gateway',
      })
      .code(200);
  },
};

export default homeCTRL;
