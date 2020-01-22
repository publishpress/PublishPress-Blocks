<?php


class SearchBarBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-search-bar-wrapper');
            $I->clickWithLeftButton('.advgb-search-bar-wrapper');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createSearchBarBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Search Bar block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->waitForElementVisible('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close"]');

        $I->fillField('.editor-post-title__input', 'Search Bar Block');

        // Insert block
        $I->insertBlock('Search Bar');
        $I->waitForElement('.advgb-search-bar-wrapper');

        // Change width
        $I->fillField('//label[text()="Width"]/following-sibling::node()/following-sibling::node()', 600);

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.advgb-search-bar-form');

        // Check
        $I->seeElement('//div[@class="advgb-search-bar-inner"][contains(@style, "width:600px")]');
    }

    public function changeSearchIcon(AcceptanceTester $I) {
        $I->wantTo('Change search bar icon styles');

        // Change styles
        $I->click('//label[text()="Full width"]/preceding-sibling::node()');
        $I->click('//label[text()="Search icon on the right"]/preceding-sibling::node()');
        $I->click('//div[@class="advgb-icon-items-wrapper"]/div[@class="advgb-icon-item"][3]/span');

        $I->wait(0.5);
        $I->updatePost();
        $I->waitForElement('.advgb-search-bar-form');

        // Check
        $I->seeElement('//div[@class="advgb-search-bar-inner"][contains(@style, "width:100%")]');
        $I->seeElement('//input[@class="advgb-search-bar-input"]/following-sibling::node()[@class="advgb-search-bar-icon"]');
    }

    public function changeSearchInput(AcceptanceTester $I) {
        $I->wantTo('Change search bar input styles');

        // Change
        $I->click('//button[text()="Search Input Settings"]');
        $I->fillField('//label[text()="Search placeholder"]/following-sibling::node()', 'Search here');

        // Change colors
        $I->click('//button/span[text()="Input Color"]');

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#dcdcdc');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-search-bar-wrapper'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-search-bar-wrapper'); // click block to hide picker

        $I->wait(0.5);
        $I->updatePost();
        $I->waitForElement('.advgb-search-bar-form');

        // Check
        $I->seeElement('//div[@class="advgb-search-bar"][contains(@style, "background-color:#dcdcdc")]');
        $I->seeElement('//div[@class="advgb-search-bar"][contains(@style, "color:#ff0000")]');
        $I->seeElement('//div[@class="advgb-search-bar"]/input[@class="advgb-search-bar-input"][@placeholder="Search here"]');
    }

    public function changeSubmitButtonStyles(AcceptanceTester $I) {
        $I->wantTo('Change search submit button styles');

        // Change
        $I->click('//button[text()="Search Button Settings"]');
        $I->click('//label[text()="Search button on the left"]/preceding-sibling::node()');

        // Change colors
        $I->clickAndWait('//span[contains(@class, "components-base-control__label")][text()="Background color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#000000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-search-bar-wrapper'); // click block to hide picker

        $I->clickAndWait('//span[contains(@class, "components-base-control__label")][text()="Text color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ffff00');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-search-bar-wrapper'); // click block to hide picker

        $I->fillField('//label[text()="Border radius (px)"]/following-sibling::node()/following-sibling::node()', 10);

        $I->wait(0.5);
        $I->updatePost();
        $I->waitForElement('.advgb-search-bar-form');

        // Check
        $I->seeElement('//div[@class="advgb-search-bar-inner"]/div[@class="advgb-search-bar"]/preceding-sibling::node()[@class="advgb-search-button-wrapper"]');
        $I->seeElement('//div[@class="advgb-search-bar"][contains(@style, "border-radius:10px")]');
        $I->seeElement('//div[@class="advgb-search-button-wrapper"]/button[contains(@style, "border-radius:10px")]');
        $I->seeElement('//div[@class="advgb-search-button-wrapper"]/button[contains(@style, "color:#ffff00")]');
        $I->seeElement('//div[@class="advgb-search-button-wrapper"]/button[contains(@style, "border-color:#ffff00")]');
        $I->seeElement('//div[@class="advgb-search-button-wrapper"]/button[contains(@style, "background-color:#000000")]');
    }

    public function changeButtonHoverStyles(AcceptanceTester $I) {
        $I->wantTo('Change search button hover styles');

        // Change
        $I->click('//button[text()="Search Button Settings"]');
        $I->click('//span[text()="Hover Colors"]');

        // Change hover color
        $I->clickAndWait('//h2/button/span[text()="Hover Colors"]/parent::node()/parent::node()/following-sibling::node()//span[text()="Background color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-search-bar-wrapper'); // click block to hide picker

        $I->clickAndWait('//h2/button/span[text()="Hover Colors"]/parent::node()/parent::node()/following-sibling::node()//span[text()="Text color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#2196f3');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-search-bar-wrapper'); // click block to hide picker

        $I->clickAndWait('//span[contains(@class, "components-base-control__label")][text()="Shadow color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ffff00');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-search-bar-wrapper'); // click block to hide picker

        $I->click('//button[text()="Hover Shadow"]');
        $I->fillField('//label[text()="Opacity (%)"]/following-sibling::node()/following-sibling::node()', 50);
        $I->fillField('//label[text()="Transition speed (ms)"]/following-sibling::node()/following-sibling::node()', 500);
        $I->fillField('//label[text()="Shadow H offset"]/following-sibling::node()/following-sibling::node()', 2);
        $I->fillField('//label[text()="Shadow V offset"]/following-sibling::node()/following-sibling::node()', 3);
        $I->fillField('//label[text()="Shadow blur"]/following-sibling::node()/following-sibling::node()', 4);
        $I->fillField('//label[text()="Shadow spread"]/following-sibling::node()/following-sibling::node()', 5);

        $I->wait(0.5);
        $I->updatePost();
        $I->waitForElement('.advgb-search-bar-form');

        // Check
        $I->moveMouseOver('.advgb-search-button-wrapper button');
        $I->wait(1);

        $hBgColor = $I->executeJS('return jQuery(".advgb-search-button-wrapper button").css("backgroundColor")');
        $I->assertEquals('rgb(255, 0, 0)', $hBgColor);

        $hTextColor = $I->executeJS('return jQuery(".advgb-search-button-wrapper button").css("color")');
        $I->assertEquals('rgb(33, 150, 243)', $hTextColor);

        $boxShadow = $I->executeJS('return jQuery(".advgb-search-button-wrapper button").css("boxShadow")');
        $I->assertEquals('rgb(255, 255, 0) 2px 3px 4px 5px', $boxShadow);

        $transition = $I->executeJS('return jQuery(".advgb-search-button-wrapper button").css("transition")');
        $I->assertTrue(strpos($transition, '0.5s') !== false);

        $opacity = $I->executeJS('return jQuery(".advgb-search-button-wrapper button").css("opacity")');
        $I->assertEquals("0.5", $opacity);
    }
}