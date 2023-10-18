import { Client } from "@notionhq/client";
import config from "config";

const notion = new Client({
    auth: config.get('NOTION_ID'),
})

export async function create(couch, date, time) {
    const response = await notion.pages.create({
        parent: { database_id: config.get('DB_ID')},
        properties: {
            Couch: {
                title: [
                    {
                        text: {
                            content: couch
                        }
                    }
                ]
            },
            Date: {
                date: {
                    start: date
                }
            },
            Minutes: {
                content: time
            }

        }
    })

    return response;
}