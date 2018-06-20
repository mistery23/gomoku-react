const publicPath = process.env.NODE_ENV==='production' ? '/' : '/';

const routePaths = {
  HOME: publicPath,
  GAME: `${ publicPath }game`,
};

export default routePaths;
export {publicPath};