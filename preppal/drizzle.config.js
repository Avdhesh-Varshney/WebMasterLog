/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://preppal_owner:3hW7vwtBQfub@ep-flat-dust-a8sy21l8.eastus2.azure.neon.tech/preppal?sslmode=require',
    }
  };