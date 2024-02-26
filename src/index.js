// REQUIRE STATEMENTS ==============================================
require("dotenv").config();
const axios = require("axios");
const { Client } = require("@notionhq/client");
const { exit } = require("process");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// =================================================================

// GET INFO FUNCTION DEFINITIONS ===================================

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

// Get Data from Calendar DB from Notion -----------------------------
const getDataFromCalendar = async () => {
  try {
    const response = await getDataFromX(process.env.NOTION_CALENDAR_ID);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

// getDataFromCalendar();

// -----------------------------------------------------------------

// Get All Projects from Notion ------------------------------------

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
      // console.log(project);
      return project.properties.Name.title[0].plain_text;
    });

    console.log(projectNames);
    return projectNames;
  } catch (error) {
    console.error(error);
  }
};

// getProjectNames();

// -----------------------------------------------------------------

// =================================================================

// POST INFO FUNCTION DEFINITIONS ==================================

// Create an Entry in the Calendar in Notion -----------------------

const createPageInCalendar = async () => {
  try {
    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: "d4bf5a7006184e789e99fd942de19090",
      },
      icon: {
        type: "emoji",
        emoji: "🏗",
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Test",
              },
            },
          ],
        },
        Date: {
          date: {
            start: "2024-02-26",
            end: "2024-02-29",
          },
        },
      },
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// createPageInCalendar();

// -----------------------------------------------------------------

// Get Page ID where Name equals Parameter -------------------------
const getPageId = async (name) => {
  try {
    const response = await getDataFromCalendar();

    const pageId = response.filter((page) => {
      return page.properties.Name.title[0].plain_text === name;
    })[0].id;

    console.log(pageId);
    return pageId;
  } catch (error) {
    console.error(error);
  }
};

// ---------------------------------------------------------------------

// Edit the Entry in the Calendar in Notion ----------------------------
const updatePageInCalendar = async (name) => {
  try {
    const response = await notion.pages.update({
      page_id: await getPageId(name),
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Test Edited",
              },
            },
          ],
        },
        Date: {
          date: {
            start: "2024-02-27",
            end: "2024-02-29",
          },
        },
      },
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// updatePageInCalendar("Test");

// -----------------------------------------------------------------

// Delete an Entry in the Calendar in Notion where Name matches Parameter ------------------------
const deletePageInCalendar = async (name) => {
  try {
    const response = await notion.pages.update({
      page_id: await getPageId(name),
      archived: true,
    });

    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// deletePageInCalendar("Test Edited");
