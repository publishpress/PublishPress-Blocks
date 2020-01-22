<?php


class LoginBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-lores-form-wrapper');
            $I->click('//h3[contains(@class, "advgb-lores-form-welcome")]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createLoginBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Login block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->waitForElementVisible('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close dialog"]');

        $I->fillField('.editor-post-title__input', 'Login Block');

        // Insert block
        $I->insertBlock('Login/Register Form');
        $I->waitForElement('.advgb-lores-form-wrapper');

        // Change width
        $I->fillField('//label[text()="Form Width (px)"]/following-sibling::node()/following-sibling::node()', 600);
        $I->fillField('//label[text()="Logo Width (px)"]/following-sibling::node()/following-sibling::node()', 200);

        // Change header color
        $I->click('//button/span[text()="Header Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Header color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ffff00');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.advgb-form-login');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-lores-form-wrapper")][contains(@style, "width:600px")]');
        $I->seeElement('//img[contains(@class, "advgb-lores-form-logo")][contains(@style, "width:200px")]');
        // disable registration, no header to check
        //$I->seeElement('//div[contains(@class, "advgb-header-navigation")][contains(@style, "background-color:#ffff00")]');
    }

    public function changeInputAndTextStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change text and input styles');

        // Change
        $I->click('//button[text()="Input placeholder"]');
        $I->fillField('//label[text()="Login input placeholder"]/following-sibling::node()', 'Your username or email');
        $I->fillField('//label[text()="Username input placeholder"]/following-sibling::node()', 'Your username');
        $I->fillField('//label[text()="Email input placeholder"]/following-sibling::node()', 'Your email');

        // Change colors
        $I->click('//button/span[text()="Text/Input Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Input background color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#dddddd');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Input color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ffff00');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff00ff');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        // Update post
        $I->wait(0.5);
        $I->updatePost();
        $I->waitForElement('.advgb-form-login');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-lores-field-label")]/label[contains(@style, "color:#ff00ff")]');
        $I->seeElement('//div[contains(@class, "advgb-lores-field-input")][contains(@style, "background-color:#dddddd")]');
        $I->seeElement('//div[contains(@class, "advgb-lores-field-input")][contains(@style, "color:#ffff00")]');
        $I->seeElement('//input[contains(@class, "advgb-lores-input")][contains(@style, "color:#ffff00")]');
        $I->seeElement('//input[contains(@class, "advgb-lores-input")][@placeholder="Your username or email"]');
    }

    public function changeBorderStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change border styles');

        // Change
        $I->click('//button[text()="Border Settings"]');

        $I->click('//button/span[text()="Border Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#000000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        $I->selectOption('//label[text()="Border Style"]/following-sibling::node()', array('text' => 'Dashed'));
        $I->fillField('//label[text()="Border width"]/following-sibling::node()/following-sibling::node()', 2);

        // Update post
        $I->wait(0.5);
        $I->updatePost();
        $I->waitForElement('.advgb-form-login');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-lores-field-input")][contains(@style, "border-bottom-color:#000000")]');
        $I->seeElement('//div[contains(@class, "advgb-lores-field-input")][contains(@style, "border-style:dashed")]');
        $I->seeElement('//div[contains(@class, "advgb-lores-field-input")][contains(@style, "border-width:2px")]');
    }

    public function changeButtonStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change submit button styles');

        // Change
        $I->clickAndWait('//span[contains(@class, "components-base-control__label")][text()="Border and Text"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ffff00');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        $I->clickAndWait('//span[contains(@class, "components-base-control__label")][text()="Background"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ffffff');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        $I->fillField('//label[text()="Button border radius"]/following-sibling::node()/following-sibling::node()', 10);
        $I->selectOption('//label[text()="Button position"]/following-sibling::node()', array('text' => 'Center'));

        // Update post
        $I->wait(0.5);
        $I->updatePost();
        $I->waitForElement('.advgb-form-login');

        // Check
        $I->seeElement('.advgb-submit-align-center');
        $I->seeElement('//button[contains(@class, "advgb-lores-submit-button")][contains(@style, "border-color:#ffff00")]');
        $I->seeElement('//button[contains(@class, "advgb-lores-submit-button")][contains(@style, "color:#ffff00")]');
        $I->seeElement('//button[contains(@class, "advgb-lores-submit-button")][contains(@style, "background-color:#ffffff")]');
        $I->seeElement('//button[contains(@class, "advgb-lores-submit-button")][contains(@style, "border-radius:10px")]');
    }

    public function changeButtonHoverStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change submit button hover styles');

        // Change
        $I->click('//button[text()="Submit Button Settings"]');
        $I->click('//button[text()="Submit Button Hover"]');
        $I->click('//button/span[text()="Hover Colors"]');

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#000000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ffffff');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Shadow color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-lores-form-wrapper .advgb-header-navigation'); // click block to hide picker

        $I->click('//button[text()="Shadow"]');
        $I->fillField('//label[text()="Opacity (%)"]/following-sibling::node()/following-sibling::node()', 50);
        $I->fillField('//label[text()="Transition speed (ms)"]/following-sibling::node()/following-sibling::node()', 500);
        $I->fillField('//label[text()="Shadow H offset"]/following-sibling::node()/following-sibling::node()', 2);
        $I->fillField('//label[text()="Shadow V offset"]/following-sibling::node()/following-sibling::node()', 3);
        $I->fillField('//label[text()="Shadow blur"]/following-sibling::node()/following-sibling::node()', 4);
        $I->fillField('//label[text()="Shadow spread"]/following-sibling::node()/following-sibling::node()', 5);

        // Update post
        $I->wait(0.5);
        $I->updatePost();
        $I->waitForElement('.advgb-form-login');

        // Check
        $I->moveMouseOver('button.advgb-lores-submit-button');
        $I->wait(1);

        $hBgColor = $I->executeJS('return jQuery("button.advgb-lores-submit-button").css("backgroundColor")');
        $I->assertEquals('rgb(0, 0, 0)', $hBgColor);

        $hTextColor = $I->executeJS('return jQuery("button.advgb-lores-submit-button").css("color")');
        $I->assertEquals('rgb(255, 255, 255)', $hTextColor);

        $boxShadow = $I->executeJS('return jQuery("button.advgb-lores-submit-button").css("boxShadow")');
        $I->assertEquals('rgb(255, 0, 0) 2px 3px 4px 5px', $boxShadow);

        $transition = $I->executeJS('return jQuery("button.advgb-lores-submit-button").css("transition")');
        $I->assertTrue(strpos($transition, '0.5s') !== false);

        $opacity = $I->executeJS('return jQuery("button.advgb-lores-submit-button").css("opacity")');
        $I->assertEquals("0.5", $opacity);
    }
}