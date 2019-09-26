const dev = {
  s3: {
    BUCKET: "YOUR_DEV_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "YOUR_DEV_API_GATEWAY_REGION",
    URL: "YOUR_DEV_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "YOUR_DEV_COGNITO_REGION",
    USER_POOL_ID: "YOUR_DEV_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_DEV_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_DEV_IDENTITY_POOL_ID"
  },
  auth: {
    AUTH_CLIENT_ID: 3,
    AUTH_CLIENT_SECRET: "2UItr62OLvEBfvuCLP396VpK9S1jVSgmXoksh2x0",
    REDIRECT_URI: "http://localhost:3000/callback"
  },
  BASE_URL: "http://127.0.0.1:8000"
};

const prod = {
  s3: {
    BUCKET: "YOUR_PROD_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "YOUR_PROD_API_GATEWAY_REGION",
    URL: "YOUR_PROD_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "YOUR_PROD_COGNITO_REGION",
    USER_POOL_ID: "YOUR_PROD_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_PROD_IDENTITY_POOL_ID"
  },
  auth: {
    AUTH_CLIENT_ID: 3,
    AUTH_CLIENT_SECRET: "2UItr62OLvEBfvuCLP396VpK9S1jVSgmXoksh2x0",
    REDIRECT_URI: "http://localhost:3000/callback"
  },
  BASE_URL: "http://127.0.0.1:8000"
};

const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  TIMEOUT: 60000,
  ...config
};
