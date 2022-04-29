import { Application } from './application/Application';
import { AuthController } from './controllers/AuthController';
import { ProductController } from './controllers/ProductController';
import { ReviewController } from './controllers/ReviewController';
import { UserController } from './controllers/UserController';
import { SqlProductRepository } from './repositories/SqlProductRepository';
import { SqlReviewRepository } from './repositories/SqlReviewRepository';
import { SqlUserRepository } from './repositories/SqlUserRepository';
import { AuthRoute } from './routes/AuthRoute';
import { ProductRoute } from './routes/ProductRoute';
import { ReviewRoute } from './routes/ReviewRoute';
import { Route } from './routes/Route';
import { UserRoute } from './routes/UserRoute';
import { DefaultProductService } from './services/DefaultProductService';
import { DefaultReviewService } from './services/DefaultReviewService';
import { DefaultUserService } from './services/DefaultUserService';
import { BcryptPasswordService } from './services/external/BcryptPasswordService';
import { JwtTokenService } from './services/external/JwtTokenService';
import { LoggerImpl } from './utils/LoggerImpl';

const logger = new LoggerImpl();

const userRepository = new SqlUserRepository();
const passwordService = new BcryptPasswordService();
const userService = new DefaultUserService(userRepository, passwordService);
const userController = new UserController(userService, logger);
const userRoute = new UserRoute(userController);

const productRepository = new SqlProductRepository();
const productService = new DefaultProductService(productRepository);
const productController = new ProductController(productService, logger);
const productRoute = new ProductRoute(productController);

const reviewRepository = new SqlReviewRepository();
const reviewService = new DefaultReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService, logger);
const reviewRoute = new ReviewRoute(reviewController);

const tokenService = new JwtTokenService();
const authController = new AuthController(userService, tokenService, logger);
const authRoute = new AuthRoute(authController);

const routeList: Route[] = [];
routeList.push(userRoute);
routeList.push(productRoute);
routeList.push(reviewRoute);
routeList.push(authRoute);

const application: Application = new Application(routeList, logger);
application.initializePort(4444);
application.verifyConnection();
