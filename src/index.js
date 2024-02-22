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
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // console.log(response.results);
    return response.results;
  } catch (error) {
    console.error(error);
  }
};

// Get Data from Home Page from Notion -----------------------------
const getDataFromHome = async () => {
  try {
    const response = await getDataFromX(process.env.NOTION_HOME_ID);

    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

getDataFromHome();

// -----------------------------------------------------------------

// Get Alll Projects from Notion ----------------------------

const getAllProjects = async () => {
  try {
    const response = await getDataFromX(process.env.NOTION_PROJECTS_ID);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// getAllProjects();

// -----------------------------------------------------------------

// Get All Project Names from Notion -------------------------------

const getProjectNames = async () => {
  try {
    const response = await getDataFromX(process.env.NOTION_PROJECTS_ID);

    const projectNames = response.map((project) => {
      return project.properties.Name.title[0].plain_text;
    });

    console.log(projectNames);
    return projectNames;
    
  } catch (error) {
    console.error(error);
  }
};

getProjectNames();

// =================================================================
