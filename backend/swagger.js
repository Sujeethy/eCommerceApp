// swagger.js
import swaggerAutogen from 'swagger-autogen';

// Initialize swaggerAutogen
const swaggerAutogenInstance = swaggerAutogen();

// Define the Swagger configuration
const doc = {
  info: {
    title: 'Express API Documentation',
    description: 'API documentation for your Express application',
  },
  host: 'localhost:5000', // Change this to your production URL if needed
  schemes: ['http'],
};

// Paths to your route files
const outputFile = './swagger-output.json'; // File where Swagger JSON will be saved
const endpointsFiles = ['./routes/auth.route.js', './routes/cart.route.js', './routes/order.route.js', './routes/payment.route.js']; // List of route files

// Generate Swagger documentation
swaggerAutogenInstance(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully');
});
