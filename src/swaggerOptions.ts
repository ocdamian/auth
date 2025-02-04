

export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Notifications API",
            version: "1.0.0",
            description: "The notification microservice is a service that helps us send any type of message (SMS, voice, email and WhatsApp).",
        },
        servers: [
            // {
            //     url: "http://localhost:3000",
            // },
            {
                url: "https://microservicedev.providigital.com/notification/"
            }
        ],
    },
    apis: ["./src/routes/*.ts"],
};