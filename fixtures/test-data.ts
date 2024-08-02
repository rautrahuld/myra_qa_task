import { test as baseTest } from '@playwright/test';

const testData = {
    loginData: {
        admin: {
            username: "admin",
            password: "password"
        }
    },
    roomData: {
        create: {
            id: "201",
            type: "Twin",
            accessible: "true",
            price: "150",
            features: ["WiFi", "TV"],
            description: "A spacious Twin room with modern amenities."
        },
        update: {
            id: "201",
            newData: {
                id: "202",
                type: "Double",
                accessible: "false",
                price: "200",
                features: ["WiFi", "TV", "Refreshments", "Safe"],
                description: "An updated Double room with additional amenities.",
                image: "/images/room2.jpg"
            }
        },
        delete: {
            id: "202"
        },
        invalid: {
            id: "",
            type: "Twin",
            accessible: "true",
            price: "205",
            features: "",
            description: "",
            errorMessage: "Room name must be set"
        }
    }
};

const test = baseTest.extend({
    testData: async ({ }, use) => {
        await use(testData);
    }
});

export default test;