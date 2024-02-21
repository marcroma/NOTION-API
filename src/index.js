// REQUIRE STATEMENTS ==============================================
require("dotenv").config();
const axios = require("axios");
const { Client } = require("@notionhq/client");
const { exit } = require("process");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// =================================================================

// FUNCTION DEFINITIONS ============================================

// Universal Function to Get Data from X ---------------------------

const getDataFromX = async (databaseId) => {
  (async () => {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    return response.results;
  })().catch(console.error);
};

// Get Data from Home Page from Notion -----------------------------
const getDataFromHome = async () => {
  const response = getDataFromX(process.env.NOTION_HOME_ID);

  console.log(response.results);
};

// getDataFromHome();

// -----------------------------------------------------------------

// Get Alll Projects from Notion ----------------------------

const getAllProjects = async () => {
  (async () => {
    const response = getDataFromX(process.env.NOTION_PROJECTS_ID);

    // console.log(response.results);
    return response.results;
  })().catch(console.error);
};

getAllProjects();

// -----------------------------------------------------------------

// Get All Project Names from Notion -------------------------------

const getProjectNames = async () => {
 
};

getProjectNames();

// =================================================================
