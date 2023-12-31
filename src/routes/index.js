import express from 'express';
import config from '../config/index.js';
import authRouter from '../module/auth/auth.route.js';
import ownerRouter from '../module/owner/owner.route.js';
import renterRouter from '../module/renter/renter.route.js';
import houseRouter from '../module/house/house.route.js';
const router = express.Router();
const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter.authRouter,
  },
  {
    path: '/owner',
    route: ownerRouter.ownerRouter
  },
  {
    path: '/renter',
    route: renterRouter.renterRouter,
  },
  {
    path: '/house',
    route: houseRouter.houseRouter,
  },
];
defaultRoutes.forEach(route => {
  const apis = route.route.stack.map(path => {
    return { path: path.route.path, methods: path.route.methods };
  });
  apis.map(api => {
    console.log([
      api.methods,
      { route: `${config.api_route}${route.path}${api.path}` },
    ]);
  });
  router.use(route.path, route.route);
});

export default router;
