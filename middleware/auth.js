const { getUser } =  require('@kinde-oss/kinde-node-express');

const isAuthenticated = (req, res, next) => {
  const user = getUser(req);
  if (!user) {

    return res.redirect('/');
  }
  req.user = user; 
  next();
};


const isAdmin = (req, res, next) => {
    const user = req.user; 
    if (!user || user.role !== 'admin') {
        return res.redirect('/unauthorized');
    }
    next();
};

const isUser = (req, res, next) => {
    const user = req.user; 
    if (!user || user.role !== 'user') {
        return res.redirect('/unauthorized');
    }
    next();
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isUser,
};
