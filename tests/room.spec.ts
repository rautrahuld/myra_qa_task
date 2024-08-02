import test from "../fixtures/test-data";
import { LoginPage } from "../pages/login-page";
import { HomePage } from "../pages/home-page";
import { RoomPage } from "../pages/room-page";
import { expect } from "@playwright/test";

test.describe.configure({ mode: 'serial' });

test.describe('Admin panel allows administrators to perform CRUD operations on rooms.',  () => {
    let loginPage: LoginPage;
    let roomPage: RoomPage;
    let homePage:HomePage;

    test.beforeEach(async ({ page, baseURL, testData }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        roomPage = new RoomPage(page);
        const adminUser = testData.loginData.admin;

        await loginPage.navigateTo(`${baseURL}#/admin`);
        await loginPage.login(adminUser.username, adminUser.password);
        await expect(homePage.logoutButton).toBeVisible();
    });

    test('TC001 Admin panel allows administrators to create room - happy path', async ({ testData }) => {
        const createRoomData = testData.roomData.create;
        await roomPage.createRoom(createRoomData);
        await roomPage.verifyRoomIsListed(createRoomData);
    });

    test('TC002 Admin panel allows administrators to update room - happy path', async ({ testData }) => {
        const updateRoomData = testData.roomData.update;
        await roomPage.updateRoom(updateRoomData.id, updateRoomData.newData);
        await roomPage.verifyRoomIsUpdated(updateRoomData.newData);
    });

    test('TC003 Admin panel allows administrators to delete room - happy path', async ({ testData }) => {
        const deleteRoomId = testData.roomData.delete.id;
        await roomPage.deleteRoom(deleteRoomId);
        await roomPage.verifyRoomIsDeleted(deleteRoomId);
    });

    test('TC004 Admin panel does not allow administrators to create room with invalid data - negative test', async ({ testData }) => {
        const createRoomInvalidData = testData.roomData.invalid;
        await roomPage.createRoom(createRoomInvalidData);
        await homePage.verifyErrorMessage(createRoomInvalidData.errorMessage);
    });

    test.afterEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.logout();
        await expect(loginPage.loginButton).toBeVisible();
    })
});