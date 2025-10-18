const adminMiddleware = (request, response, next) => {
  const userIsAdmin = request.userIsAdmin;

  if (!userIsAdmin) {
    return response.status(401).json();
  }

  return next();
};

export default adminMiddleware;
