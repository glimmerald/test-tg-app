import { Client } from "@notionhq/client";

const notion = new Client({
    auth: "secret_rg3xAu9SqfgZmZRgsugKN9C4VqsaR8tVm0fc2jEDqNm"
})

export async function addToDataBase(couch, date, time) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: '8d9635aeefc8496a8146fd726e18387c' },
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
        });
        console.log(response);
    } catch(error) {

    }
}
