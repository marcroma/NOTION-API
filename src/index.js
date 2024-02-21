// REQUIRE STATEMENTS ==============================================
const axios = require("axios");
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// =================================================================

// FUNCTION DEFINITIONS ============================================

// Get Data from database from Notion
const getData = async () => {
  (async () => {
    const databaseId = NOTION_DATABASE_ID;
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    console.log(response);
  })().catch(console.error);
};

getData();
