# Test Automation for B&B Booking Management Application

This repository contains an automated test suite developed using Playwright to verify whether the admin panel allows administrators to perform CRUD operations (Create, Read, Update, Delete) on rooms. 
The test suite includes both positive and negative test cases and is designed to ensure that the CRUD operations function correctly under various scenarios.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup and Installation](#setup-and-installation)
3. [Test Cases](#test-cases)
4. [Exploratory Testing and Bug Reporting](#exploratory-testing-and-bug-reporting)
5. [Running the Tests](#running-the-tests)


## Project Overview

The primary objective of this project is to automate the verification of the CRUD functionality. The following tasks have been completed:

1. Developed automated tests using Playwright to check Create, Read, Update, Delete functionality on room for admin user.
2. Implemented tests with fixture data, page objects, action methods, and reporting.
3. Conducted exploratory testing, identified bugs, and created a detailed bug report.

## Setup and Installation

To set up and run the test automation suite, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rautrahuld/myra_qa_task.git

2. **Install dependencies:**

   Ensure you have Node.js installed. Then, install the required npm packages:
    ```bash
    npm install

## Test Cases

The automated test suite includes the following test cases:

1. **Happy Path Test:**

    - Verifies that the Admin panel allows administrators to create, update and delete room.

2. **Negative Test:**

    - Admin panel does not allow administrators to create room with invalid data
    - Tests how the application handles create room funcitonality and displays error message.

## Exploratory Testing and Bug Reporting

During exploratory testing, few bugs and missing validations were identified. A detailed bug report has been created and included in the repository.

**Bug Report:**

  - **File Name: Bug Report.pdf**
  
  - **Description:** This document includes an exploration of the identified bug, steps to reproduce, and screenshots.

The bug report is available for review in the repository.

## Running the Tests

  - To run the test suite, use the following command:
  
     ```bash
     npx playwright test

For more detailed test reporting and results, check the [Playwright documentation](https://playwright.dev/docs/intro).
