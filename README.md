# inventory-system

## Description

The REST API for Inventory system. This project is developed for practicing the standard conventions in developing REST API

### Functionalities
* Login
* CRUD operation for Products
* CRUD operation for Reviews
* JWT Authentication
* Role Checker

## Test and coverage
------------------------------------|---------|----------|---------|---------|-------------------
File                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------------------|---------|----------|---------|---------|-------------------
All files                           |   70.02 |    72.72 |   74.54 |    69.4 |                  
 src                                |       0 |      100 |     100 |       0 |                  
  server.ts                         |       0 |      100 |     100 |       0 | 1-51             
 src/application                    |       0 |      100 |       0 |       0 |                  
  Application.ts                    |       0 |      100 |       0 |       0 | 1-40             
 src/controllers                    |     100 |      100 |     100 |     100 |                  
  AuthController.ts                 |     100 |      100 |     100 |     100 |                  
  ProductController.ts              |     100 |      100 |     100 |     100 |                  
  ReviewController.ts               |     100 |      100 |     100 |     100 |                  
  UserController.ts                 |     100 |      100 |     100 |     100 |                  
 src/controllers/errors             |     100 |      100 |     100 |     100 |                  
  InvalidRequestError.ts            |     100 |      100 |     100 |     100 |                  
  TooManyRequestsError.ts           |     100 |      100 |     100 |     100 |                  
 src/middlewares                    |      50 |    61.11 |      40 |      50 |                  
  checkRole.ts                      |      50 |       20 |   33.33 |      50 | 13-17,21-25      
  errorHandler.ts                   |     100 |      100 |     100 |     100 |                  
  rateLimiterHandler.ts             |       0 |      100 |       0 |       0 | 2-15             
  validateJwt.ts                    |       0 |        0 |       0 |       0 | 2-20             
  validateSchema.ts                 |      70 |        0 |     100 |      70 | 11-13            
 src/middlewares/validators         |     100 |      100 |     100 |     100 |                  
  validators.ts                     |     100 |      100 |     100 |     100 |                  
 src/middlewares/validators/product |     100 |      100 |     100 |     100 |                  
  productValidator.ts               |     100 |      100 |     100 |     100 |                  
 src/middlewares/validators/review  |     100 |      100 |     100 |     100 |                  
  reviewValidator.ts                |     100 |      100 |     100 |     100 |                  
 src/middlewares/validators/user    |     100 |      100 |     100 |     100 |                  
  userChangePasswordValidator.ts    |     100 |      100 |     100 |     100 |                  
  userLoginValidator.ts             |     100 |      100 |     100 |     100 |                  
  userRegistrationValidator.ts      |     100 |      100 |     100 |     100 |                  
 src/models/enums                   |     100 |      100 |     100 |     100 |                  
  Role.ts                           |     100 |      100 |     100 |     100 |                  
 src/models/sequelize               |     100 |      100 |     100 |     100 |                  
  ProductSequelize.ts               |     100 |      100 |     100 |     100 |                  
  ReviewSequelize.ts                |     100 |      100 |     100 |     100 |                  
  UserSequelize.ts                  |     100 |      100 |     100 |     100 |                  
 src/repositories                   |   97.61 |    66.66 |     100 |   97.61 |                  
  ProductNotFoundError.ts           |     100 |      100 |     100 |     100 |                  
  SqlProductRepository.ts           |     100 |      100 |     100 |     100 |                  
  SqlReviewRepository.ts            |     100 |      100 |     100 |     100 |                  
  SqlUserRepository.ts              |   93.33 |       50 |     100 |   93.33 | 24               
  UserNotFoundError.ts              |     100 |      100 |     100 |     100 |                  
 src/routes                         |       0 |      100 |       0 |       0 |                  
  AuthRoute.ts                      |       0 |      100 |       0 |       0 | 3-12             
  ProductRoute.ts                   |       0 |      100 |       0 |       0 | 3-24             
  ReviewRoute.ts                    |       0 |      100 |       0 |       0 | 3-30             
  UserRoute.ts                      |       0 |      100 |       0 |       0 | 3-20             
 src/services                       |   97.72 |       75 |     100 |   97.67 |                  
  DefaultProductService.ts          |     100 |      100 |     100 |     100 |                  
  DefaultReviewService.ts           |     100 |      100 |     100 |     100 |                  
  DefaultUserService.ts             |   96.42 |       75 |     100 |   96.29 | 41               
 src/services/errors                |     100 |      100 |     100 |     100 |                  
  InvalidUsernamePasswordError.ts   |     100 |      100 |     100 |     100 |                  
  PasswordsNotMatchError.ts         |     100 |      100 |     100 |     100 |                  
  UserNameAlreadyExistsError.ts     |     100 |      100 |     100 |     100 |                  
 src/services/external              |     100 |      100 |     100 |     100 |                  
  BcryptPasswordService.ts          |     100 |      100 |     100 |     100 |                  
  JwtTokenService.ts                |     100 |      100 |     100 |     100 |                  
 src/utils                          |      35 |      100 |       0 |   33.33 |                  
  LoggerImpl.ts                     |       0 |      100 |       0 |       0 | 2-32             
  connection.ts                     |   58.33 |      100 |       0 |      60 | 14-18            
------------------------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 70.02% ( 348/497 )
Branches     : 72.72% ( 24/33 )
Functions    : 74.54% ( 82/110 )
Lines        : 69.4% ( 329/474 )
================================================================================

Test Suites: 15 passed, 15 total
Tests:       84 passed, 84 total
Snapshots:   0 total
Time:        45.456 s