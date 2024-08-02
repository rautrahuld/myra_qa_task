import { expect, Locator, Page } from "@playwright/test";

export class RoomPage {
    readonly page: Page;
    readonly roomsLink: Locator;
    readonly navigationItems: Locator;
    readonly roomName: Locator;
    readonly type: Locator;
    readonly accessible: Locator;
    readonly roomPrice: Locator;
    readonly roomHeadingLocator: Locator;
    readonly roomListingLocator: Locator;

    // Button locators
    readonly createButton: Locator;
    readonly editButton: Locator;
    readonly updateButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.roomsLink = page.getByRole('link', { name: 'Rooms' });
        this.navigationItems = page.getByRole('navigation');
        this.roomName = page.locator('#roomName');
        this.type = page.locator('#type');
        this.accessible = page.locator('#accessible');
        this.roomPrice = page.locator('#roomPrice');
        this.roomHeadingLocator = page.getByRole('heading');
        this.roomListingLocator = page.getByTestId('roomlisting');

        // Button locators
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.editButton = page.getByRole('button', { name: 'Edit' });
        this.updateButton = page.getByRole('button', { name: 'Update' });
        
    }

    /**
     * Returns a locator for a facility checkbox element based on the facility name.
     * @param {string} facility The name of the facility (e.g., "WiFi")
     * @returns {Locator} Locator for the facility checkbox element
     */
    facilityLocator(facility: string) {
        return this.page.locator(`input[name="featureCheck"][value="${facility}"]`);
    }

    /**
     * Returns a locator for a specific room listing based on its ID.
     * @param {string} roomId The ID of the room
     * @returns {Locator} Locator for the room listing element
     */
    roomLocatorById(roomId: string) {
        return this.roomListingLocator.locator('div').filter({ hasText: roomId });
    }

    /**
     * Returns a locator for the delete button associated with a specific room listing.
     * @param {string} roomId The ID of the room
     * @returns {Locator} Locator for the delete button element
     */
    deleteButtonLocator(roomId: string) {
        return this.roomLocatorById(roomId)
        .locator(`//../following-sibling::div/span[contains(@class, 'roomDelete')]`);
    }

    /**
     * Returns a locator for a specific value within a room listing.
     * @param {string} roomId The ID of the room
     * @param {string} value The value to search for (e.g., room type, price)
     * @returns {Locator} Locator for the element containing the value
     */
    getRoomValueLocator(roomId: string, value: string) {
        return this.roomLocatorById(roomId)
        .locator(`//../following-sibling::div/p[contains(text(), "${value}")]`);
    }

    /**
     * Returns a locator for elements containing features within a room listing.
     * @param {string} roomId The ID of the room
     * @param {string} value Feature identifier (e.g., ID of the features element)
     * @returns {Locator} Locator for the element containing features
     */
    getRoomFeaturesLocator(roomId: string, value: string) {
        return this.roomLocatorById(roomId)
        .locator(`//../following-sibling::div/p[contains(@id, "${value}")]`);
    }


    async selectFeatures(features: string[]) {
        /**
         * Selects the given features from the available options.
         * @param {string[]} features An array of feature names to select for room
         */
        for (const facility of features) {
            const facilityElement = this.facilityLocator(facility);
            if (await facilityElement.count() > 0) {
                const isChecked = await facilityElement.isChecked();
                if (!isChecked) {
                    await facilityElement.check();
                }
            } else {
                console.warn(`Facility '${facility}' not found.`);
            }
        }
    }

    async createRoom(roomData: any) {
        /**
         * Creates a new room using the provided room data.
         * @param {object} roomData An object containing room details
         *   - id: {string} Room identification
         *   - type: {string} Room type
         *   - accessible: {string} Accessibility option (e.g., "true", "false")
         *   - price: {string} Room price
         *   - features: {string[]} Array of feature names to select
         */
        await this.roomName.fill(roomData.id);
        await this.type.selectOption(roomData.type);
        await this.accessible.selectOption(roomData.accessible);
        await this.roomPrice.fill(roomData.price);
        await this.selectFeatures(roomData.features);
        await this.createButton.click();
    }

    async updateRoom(roomId: string, updateRoomData: any) {
        /**
         * Updates an existing room with the provided data.
         * @param {string} roomId The ID of the room to update
         * @param {object} updateRoomData Updated room details (same structure as roomData in createRoom)
         */
        const roomElement = this.roomLocatorById(roomId);
        await roomElement.click();
        await expect(this.roomHeadingLocator).toContainText(roomId);
        await this.editButton.click();
        await expect(this.updateButton).toBeVisible();
        await this.roomName.fill(updateRoomData.id);
        await this.type.selectOption(updateRoomData.type);
        await this.accessible.selectOption(updateRoomData.accessible);
        await this.roomPrice.fill(updateRoomData.price);
        await this.selectFeatures(updateRoomData.features);
        await this.updateButton.click();
        await expect(this.editButton).toBeVisible();
    }

    async deleteRoom(roomId: string) {
        /**
         * Deletes the room with the given ID.
         * @param {string} roomId The ID of the room to delete
         */
        const roomElement = this.deleteButtonLocator(roomId);
        await roomElement.click();
    }

    async verifyRoomIsListed(roomData: any) {
        /**
         * Verifies that a room with the provided data is listed.
         * @param {object} roomData Room details (same structure as roomData in createRoom)
         */
        await expect(this.roomLocatorById(roomData.id)).toBeVisible();
        await expect(this.getRoomValueLocator(roomData.id, roomData.type)).toBeVisible();
        await expect(this.getRoomValueLocator(roomData.id, roomData.accessible)).toBeVisible();
        await expect(this.getRoomValueLocator(roomData.id, roomData.price)).toBeVisible();
        await expect(this.getRoomFeaturesLocator(roomData.id, roomData.features.join(','))).toBeVisible();
    }

    async verifyRoomIsUpdated(roomData: any) {
        /**
         * Verifies that a room has been updated with the provided data.
         * @param {object} roomData Updated room details (same structure as roomData in createRoom)
         */
        await expect(this.roomHeadingLocator).toContainText(roomData.id);
        await this.roomsLink.click();
        await this.verifyRoomIsListed(roomData);
    }

    async verifyRoomIsDeleted(roomId: string) {
        /**
         * Verifies that a room with the provided ID is no longer listed.
         * @param {string} roomId The ID of the room to check for deletion
         */
        await expect(this.deleteButtonLocator(roomId)).toBeHidden({ timeout: 1000 });
    }
}