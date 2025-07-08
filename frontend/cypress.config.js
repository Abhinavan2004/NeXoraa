import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    },
    
    // Configure base URL for your video chat application
    baseUrl: 'http://localhost:5173',
    
    // Configure spec patterns
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Configure viewport for video chat testing
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Video and screenshot settings
    video: true,
    screenshotOnRunFailure: true,
    
    // Timeouts for video chat app (may need longer for WebRTC)
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Browser permissions for video chat
    chromeWebSecurity: false,
    
    // Environment variables
    env: {
      API_URL: 'http://localhost:4000', // Adjust to your backend URL
    }
  },
  
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});