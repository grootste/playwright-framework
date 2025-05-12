const locators = require('../locators/locators');
const { expect } = require('@playwright/test');
const { checkElementVisible, getText, checkTextEquals, clickElement, waitForNetworkIdle, waitForVisible, scrollToElement } = require('../../utils/actions');
const { test } = require('../../fixtures/baseFixture');  // Import custom fixture fixtures
const LoginPage = require('../../pages/LoginPage');
const { email, password, fname, lname, delay10, delay20 } = require('../../config/global.config'); // Import your config

//Describing config paralel model
test.describe.configure({ mode: 'parallel' });

/**
 * Test Case 1: Navigate to HTML Page
 *
 * This test verifies that after using the base fixture to land on the HTML page,
 * the HTML tutorial home page and dashboard elements are correctly displayed.
 *
 * It checks:
 * - The visibility of the HTML Home heading.
 * - The exact text content "HTML HOME".
 * - The presence and label of the Dashboard area with text "Tutorial".
 *
 * The `page` used here is already pre-navigated by the baseFixture,
 * eliminating the need to repeat setup navigation steps inside the test body.
 */

test('TC001 - Navigate to HTML Page', async ({page}) => {
   await clickElement(page, locators.htmlPage.htmlHome);
   await checkElementVisible(page, locators.htmlPage.htmlHome);
   await checkTextEquals(page, locators.htmlPage.htmlHome, "HTML HOME");
   await checkElementVisible(page, locators.htmlPage.Homepage.Dashboard);
   await checkTextEquals(page, locators.htmlPage.Homepage.Dashboard,"Tutorial");
});


/**
 * Test Case 2: Login with Valid Credentials
 *
 * This test uses the base fixture to start directly on the HTML page,
 * then performs a user login from there.
 *
 * Steps include:
 * - Clicking the login link
 * - Filling in email and password
 * - Capturing screenshots (pre-login with masking, post-login)
 * - Clicking the login button
 * - Re-validating HTML Home page and Dashboard after login
 *
 * The `page` here is pre-loaded to W3Schools' HTML page by the fixture,
 * enabling consistent test setup and clean structure.
 */

test('TC002 - Login Login with Valid Credentials ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);    
});

/**
 * Test Case 3 : Sign Up Flow (Valid and Duplicate Users)
 *
 * Description:
 * This test automates the sign-up process from the navigation bar.
 * It handles both expected outcomes:
 *  - New user registration confirmation
 *  - Duplicate user error handling
 *
 * Flow:
 * 1. Waits for the "Sign Up" link in the navbar and clicks it.
 * 2. Fills the email, password, first name, and last name.
 * 3. Submits the form.
 * 4. Waits for confirmation or error message.
 * 5. Verifies the exact message for:
 *    - New user: email confirmation sent
 *    - Existing user: duplicate user error
 *
 * Uses modular functions (e.g. clickElement, checkTextEquals),
 * and shared locators for maintainability.
 */


test('TC003 - Sign Up with Valid or Existing User', async ({ page }) => {
    await waitForVisible(page, locators.navBar.signupLink, delay10 )
    await clickElement(page, locators.navBar.signupLink)
    await waitForNetworkIdle(page);
    await page.getByPlaceholder("email").fill(email);
    await page.getByPlaceholder("password").fill(password);
    await page.getByPlaceholder("first name").fill(fname);
    await page.getByPlaceholder("last name").fill(lname)
    await clickElement(page, locators.signupPage.submitButton)
    try{
    await waitForVisible(page, locators.signupPage.confirmationMessage, delay10 )
    await checkElementVisible(page, locators.signupPage.confirmationMessage)
    await checkTextEquals(page, locators.signupPage.confirmationMessage, `We've sent an email to ${email} with instructions.`)
}catch{
    await waitForVisible(page, locators.signupPage.errorMsg, delay10 )
    await checkElementVisible(page, locators.signupPage.errorMsg)
    await checkTextEquals(page, locators.signupPage.errorMsg, 'Looks like you already have a user. Did you try logging in?')
}
});


/**
 * Test Case 4: Bootstrap5 Color Validation
 *
 * Description:
 * This test logs in via the LoginPage class and navigates to the Bootstrap5 color section.
 * It performs visual UI checks to ensure proper rendering of Bootstrap5 text color styles.
 *
 * Steps:
 * - Log in using valid credentials.
 * - Navigate to the Bootstrap5 tutorial section via navbar.
 * - Scroll and click on the BS5 color demo.
 * - Validate Dashboard heading.
 * - Validate various styled text elements for:
 *    - Correct text content
 *    - Correct CSS color values
 *    - Correct margin-bottom spacing
 *
 * Note:
 * `locators.textStyles` is assumed to be an array of objects with { selector, text, color }.
 * This test demonstrates strong UI style verification and interaction with dynamically styled content.
 */

test('TC004 - Bootstrap5 Color Validation', async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);
  await waitForVisible(page, locators.navBar.bootStrap, delay10)
  await checkElementVisible(page, locators.navBar.bootStrap)
  await clickElement(page, locators.navBar.bootStrap)
  await scrollToElement(page, locators.bootStrap.b5btn)
  await clickElement(page, locators.bootStrap.b5btn)
  await checkElementVisible(page, locators.bootStrap.dashBord)
  await checkTextEquals(page, locators.bootStrap.dashBord, "Tutorial")
  await clickElement(page, locators.bootStrap.color.bs5Color)
  await waitForVisible(page, locators.bootStrap.color.txtColor, delay10)
  await clickElement(page, locators.bootStrap.color.txtColor)
      
  for (const style of locators.textStyles) {
      const element = page.locator(style.selector);
      
      // Verify text content
      await expect(element).toHaveText(style.text);
      
      // Verify text color
      await expect(element).toHaveCSS('color', style.color);
      
      // Verify margin-bottom for all except last element
      if (style.text !== 'Light grey text.') {
        await expect(element).toHaveCSS('margin-bottom', '8px');
      }
    }

    // Verify last element has no margin
    await expect(page.locator('.text-light')).toHaveCSS('margin-bottom', '15px');
   
});

/**
 * Test Case 5: HTML Table Validation
 *
 * Description:
 * This test case uses the base fixture to navigate to the W3Schools HTML page and login,
 * then verifies the structure and content of a sample HTML table.
 *
 * Steps:
 * - Logs in via the LoginPage abstraction
 * - Clicks the "Tables" option in the navigation bar
 * - Verifies:
 *   - Table visibility
 *   - Number of header columns
 *   - Header text matches ["Company", "Contact", "Country"]
 *   - Number of table rows (7)
 *   - Content of all table cells using regular expressions to handle whitespace
 *
 * This test demonstrates structured UI verification, table parsing,
 * and strong use of locators and pattern matching with regex.
 */


test('TC005 - HTML Table Validation', async ({ page }) => {
 
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password); // 
  await checkElementVisible(page, locators.tables.navBarTable)
  await clickElement(page, locators.tables.navBarTable)

    const table = page.locator(locators.tables.tableLocators.table);
    await expect(table).toBeVisible();

    // Verify header count and text 
    const headers = table.locator(locators.tables.tableLocators.header);
    await expect(headers).toHaveCount(3);
    await expect(headers).toHaveText(['Company', 'Contact', 'Country']);

   const rows = table.locator(locators.tables.tableLocators.rows);
    
    // Verify row count
    await expect(rows).toHaveCount(7);

    // Verify first row data
    const tabledata = table.locator(locators.tables.tableLocators.cell);
    /**Used regular expresion to verify data as the data contains white spaces */
    await expect(tabledata).toHaveText([
          /Alfreds\s+Futterkiste/,
          /Maria\s+Anders/,
          /Germany/,
          /Centro\s+comercial\s+Moctezuma/,
          /Francisco\s+Chang/,
          /Mexico/,
          /Ernst\s+Handel/,
          /Roland\s+Mendel/,
          /Austria/,
          /Island\s+Trading/,
          /Helen\s+Bennett/,
          /UK/,
          /Laughing\s+Bacchus\s+Winecellars/,
          /Yoshi\s+Tannamuri/,
          /Canada/,
          /Magazzini\s+Alimentari\s+Riuniti/,
          /Giovanni\s+Rovelli/,
          /Italy/
]);

});

/**
 * Test Case 6: HTML JavaScript Alert Popup (Confirm Box)
 *
 * Description:
 * This test logs in using the LoginPage class and navigates to the JavaScript section,
 * scrolls to the Confirm Box demo, opens the "Try it Yourself" environment in a new tab,
 * and interacts with the JavaScript confirm dialog inside an iframe.
 *
 * It tests both:
 *  - Accepting the alert
 *  - Dismissing the alert
 * 
 * Steps:
 * - Login
 * - Navigate to "JavaScript" section
 * - Scroll to and click the Confirm Box demo
 * - Launch "Try it Yourself" in a new tab
 * - Interact with confirm dialogs inside iframe
 * - Validate resulting message for both OK and Cancel choices
 *
 * This test demonstrates tab handling, iframe switching, JavaScript dialog interaction,
 * and text validation after alert confirmation or dismissal.
 */


test('TC006 - HTML JavaScript Alert Popup Confirm Box', async ({ page }) => {
      
        const loginPage = new LoginPage(page);
        await loginPage.login(email, password);
        await waitForVisible(page, locators.navBar.javaScript, delay10)
        await checkElementVisible(page, locators.navBar.javaScript)
        await clickElement(page, locators.navBar.javaScript)

        await scrollToElement(page, locators.alert.jsAlertPopup)
        await waitForVisible(page, locators.alert.jsAlertPopup, delay10)
        await checkElementVisible(page, locators.alert.jsAlertPopup)
        await clickElement(page, locators.alert.jsAlertPopup)

        await scrollToElement(page, locators.alert.alertpg)
        await waitForVisible(page, locators.alert.alertpg, delay10)
        await checkElementVisible(page, locators.alert.alertpg)
        await checkTextEquals(page, locators.alert.alertpg, "Confirm Box")

        const context = page.context();

        const [newTab] = await Promise.all([
          context.waitForEvent('page'),
          page.click(locators.alert.tryItYourself)
        ]);


        //new tab
        await newTab.waitForSelector(locators.alert.iframe);

        const frame = newTab.frame({ name: 'iframeResult' });
        await frame.locator(locators.alert.tryItBtn).click();

        // Wait for the alert to be shown and accept it
        newTab.once('dialog', async dialog => {
            console.log('Press a button!', dialog.message());
            
            await dialog.accept(); // Accept the alert

            await expect(frame.locator(locators.alert.successMsg)).toHaveText("You pressed OK!")
        })

        
        await frame.locator(locators.alert.tryItBtn).click();
        // Wait for the alert to be shown and reject it
        newTab.once('dialog', async dialog => {
            console.log('Press a button!', dialog.message());
            await dialog.dismiss(); // Accept the alert   
            await expect(frame.locator(locators.alert.successMsg)).toHaveText("You pressed Cancel!")

        });

  
});

/**
 * Test Case 7: HTML Drag and Drop Interaction
 *
 * Description:
 * This test validates the drag-and-drop functionality on the HTML demo page.
 *
 * Steps:
 * 1. Login via the `LoginPage` class.
 * 2. Navigate to the drag-and-drop demo page using `clickElement()`.
 * 3. Wait for the drag source to appear.
 * 4. Perform a drag-and-drop operation between two elements.
 * 5. Verify that the object is now visible in the drop area.
 *
 * This test demonstrates advanced DOM interaction using Playwright's `dragTo()` method.
 * It's especially useful for validating frontend interactivity and component integration.
 */

test('TC007 - HTML Drag and Drop Interaction', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);

  await clickElement(page, locators.dragAndDrop.htmlDragAndDrop)
  await waitForVisible(page,locators.dragAndDrop.firstRect, delay10 )
  
  // Locate the drag source (item to drag) and drop target (where to drop the item)
  const dragSource = await page.locator(locators.dragAndDrop.firstRect);  
  const dropTarget = await page.locator(locators.dragAndDrop.secondRect);  

  // Perform the drag-and-drop action
  await dragSource.dragTo(dropTarget);

  //verify the drop (e.g., check if the item moved)
  await expect(dropTarget.locator(locators.dragAndDrop.dragObj)).toBeVisible();

  });

  /**
 * Test Case 8: Bootstrap Spinner
 *
 * This test verifies that the Bootstrap spinner on the W3Schools HTML page functions as expected.
 * The steps include:
 * - Logging into the site with valid credentials.
 * - Navigating to the Bootstrap section via the navbar.
 * - Interacting with the Bootstrap 5 button.
 * - Ensuring that the dashboard and spinner appear correctly.
 * - Verifying that the spinner is visible, spinning (by checking CSS animation), and has the correct color.
 *
 * This test ensures that the spinner behavior follows the expected Bootstrap style and the animation runs correctly.
 */


test('TC008 -  Bootstrap Spinner', async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  await loginPage.login(email, password);

  await waitForVisible(page, locators.navBar.bootStrap, delay10)
  await checkElementVisible(page, locators.navBar.bootStrap)
  await clickElement(page, locators.navBar.bootStrap)
  await scrollToElement(page, locators.bootStrap.b5btn)
  await clickElement(page, locators.bootStrap.b5btn)
  await checkElementVisible(page, locators.bootStrap.dashBord)
  await checkTextEquals(page, locators.bootStrap.dashBord, "Tutorial")
  
  await clickElement(page, locators.spinner.bs5Spinner)
  await scrollToElement(page, locators.spinner.loader)

  const spinner = page.locator(locators.spinner.loader);

  // Check if the spinner is visible
  await expect(spinner).toBeVisible();

  // Verify the spinner is spinning (by checking its CSS animation)
  const animationName = await spinner.evaluate(el => {
    return window.getComputedStyle(el).animationName;
  });
  expect(animationName).not.toBe('none'); // The spinner should have an animation applied

  // Verify the color of the spinner (inherited from btn-primary button)
  const spinnerColor = await spinner.evaluate(el => {
    return window.getComputedStyle(el).color;
  });

  expect(spinnerColor).toBe('rgb(255, 255, 255)'); // Bootstrap primary  color

});

/**
 * Test Case 9: Bootstrap Select Dropdown
 *
 * This test verifies the functionality of the Bootstrap select dropdown on the W3Schools HTML page.
 * The steps include:
 * - Logging into the site with valid credentials.
 * - Navigating to the Bootstrap section via the navbar.
 * - Interacting with the Bootstrap 5 dropdown.
 * - Selecting an option by its label.
 * - Verifying that the correct option is selected.
 *
 * This test ensures that the dropdown behaves correctly by selecting an option and validating the expected result.
 */


test('TC009 - Bootstrap Select Dropdown', async ({ page }) => {

      const loginPage = new LoginPage(page);
      await loginPage.login(email, password);

      await waitForVisible(page, locators.navBar.bootStrap, delay10)
      await checkElementVisible(page, locators.navBar.bootStrap)
      await clickElement(page, locators.navBar.bootStrap)
      await scrollToElement(page, locators.bootStrap.b5btn)
      await clickElement(page, locators.bootStrap.b5btn)
      await checkElementVisible(page, locators.bootStrap.dashBord)
      await checkTextEquals(page, locators.bootStrap.dashBord, "Tutorial")


      await clickElement(page, locators.dropDown.bs5Select)
      const dropdown = page.locator(locators.dropDown.dropDownField);

      // Select an option by its label (you can also select by text or index)
      await dropdown.selectOption({ label: '2' });

      // Verify the selected option
      const selectedLabel = await dropdown.evaluate(el => el.options[el.selectedIndex].text);
      expect(selectedLabel).toBe('2');
  

});

/**
 * Test Case 10: Bootstrap Checkboxes
 *
 * This test verifies the functionality of the Bootstrap checkboxes on the W3Schools HTML page.
 * The steps include:
 * - Logging into the site with valid credentials.
 * - Navigating to the Bootstrap section via the navbar.
 * - Interacting with the Bootstrap checkboxes.
 * - Checking both checkboxes.
 * - Verifying that both checkboxes are checked.
 * - Unchecking the first checkbox and verifying it is unchecked.
 *
 * This test ensures that the checkboxes behave correctly when checked and unchecked.
 */


test('TC010 - Bootstrap Checkboxes', async ({ page }) => {
     
      const loginPage = new LoginPage(page);
      await loginPage.login(email, password);

      await waitForVisible(page, locators.navBar.bootStrap, delay10)
      await checkElementVisible(page, locators.navBar.bootStrap)
      await clickElement(page, locators.navBar.bootStrap)
      await scrollToElement(page, locators.bootStrap.b5btn)
      await clickElement(page, locators.bootStrap.b5btn)
      await checkElementVisible(page, locators.bootStrap.dashBord)
      await checkTextEquals(page, locators.bootStrap.dashBord, "Tutorial")


      await clickElement(page, locators.checkBox.bs5CheckBox)

      const checkbox = page.locator(locators.checkBox.radiobtn1);

      // Check the checkbox
      await checkbox.check();
      await expect(checkbox).toBeChecked();

      const checkbox2 = page.locator(locators.checkBox.radiobtn2);

      // Check the second checkbox
      await checkbox2.check();
      await expect(checkbox2).toBeChecked();

      // Uncheck the checkbox
      await expect(checkbox).not.toBeChecked();
  
});