<?php

class AdvancedListBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-list-item');
            $I->clickWithLeftButton('//div[contains(@class, "advgb-list-item")]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createAdvListBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create an Advanced List block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->waitForElementVisible('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close"]');

        $I->fillField('.editor-post-title__input', 'Advanced List Block');

        // Insert block
        $I->insertBlock('Advanced List');
        $I->waitForElement('.advgb-list-item');

        $I->wait(0.5);
        $I->pressKeys('List item 1'.\WebDriverKeys::ENTER.'List item 2'.\WebDriverKeys::ENTER.'List item 3'.\WebDriverKeys::ENTER.'List item 4'.\WebDriverKeys::ENTER.'List item 5');
        $I->click('//div[@class="advgb-icon-items-wrapper"]/div[contains(@class, "advgb-icon-item")][5]/span');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('div.wp-block-advgb-list');

        // Check block loaded
        $I->seeNumberOfElements('div.wp-block-advgb-list > ul > li', 5);
    }

    public function changeIconStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change icon styles');

        // Change styles
        $I->click('//button[text()="Text Settings"]');
        $I->waitForText('Text size');
        $I->clearField('//label[text()="Text size"]/following-sibling::node()/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Text size"]/following-sibling::node()/following-sibling::node()/following-sibling::node()', 22);

        $I->click('//button[text()="Icon color"]');

        try {
            $I->waitForElement('.components-color-palette');
            $I->click('//button[text()="Icon color"]/parent::node()/following-sibling::node()/div[last()]/*[1]');
            $I->clickAndWait('.components-color-picker__inputs-wrapper input');
            $I->selectCurrentElementText();
            $I->pressKeys('#ff0000');
            $I->pressKeys(WebDriverKeys::ENTER);
            $I->clickWithLeftButton('//div[contains(@class, "advgb-list-item")]'); // click block to hide picker
        } catch(Exception $e) {

        }

        try {
            $I->waitForElement('.components-circular-option-picker');
            $I->click('//button[text()="Icon color"]/parent::node()/following-sibling::node()/div[last()]/*[1]');
            $I->clickAndWait('.components-color-picker__inputs-wrapper input');
            $I->selectCurrentElementText();
            $I->pressKeys('#ff0000');
            $I->pressKeys(WebDriverKeys::ENTER);
            $I->clickWithLeftButton('//div[contains(@class, "advgb-list-item")]'); // click block to hide picker
        } catch(Exception $e) {

        }

        $I->clearField('//label[text()="Icon size"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Icon size"]/following-sibling::node()/following-sibling::node()', 23);
        $I->clearField('//label[text()="Line height"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Line height"]/following-sibling::node()/following-sibling::node()', 21);
        $I->clearField('//label[text()="Margin"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Margin"]/following-sibling::node()/following-sibling::node()', 5);
        $I->clearField('//label[text()="Padding"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Padding"]/following-sibling::node()/following-sibling::node()', 5);

        $I->updatePost();
        $I->waitForElement('div.wp-block-advgb-list');

        // Check styles applied
        $fontSize = $I->executeJS('return jQuery(".advgb-list li").css("font-size")');
        $I->assertEquals('22px', $fontSize);

        $iconSize = $I->executeJS('var elm = document.querySelector(".advgb-list li");var style = window.getComputedStyle(elm, "::before");return style.getPropertyValue("font-size");');
        $I->assertEquals('23px', $iconSize);

        $iconHeight = $I->executeJS('var elm = document.querySelector(".advgb-list li");var style = window.getComputedStyle(elm, "::before");return style.getPropertyValue("line-height");');
        $I->assertEquals('21px', $iconHeight);

        $iconColor = $I->executeJS('var elm = document.querySelector(".advgb-list li");var style = window.getComputedStyle(elm, "::before");return style.getPropertyValue("color");');
        $I->assertEquals('rgb(255, 0, 0)', $iconColor);

        $iconMargin = $I->executeJS('var elm = document.querySelector(".advgb-list li");var style = window.getComputedStyle(elm, "::before");return style.getPropertyValue("margin");');
        $I->assertEquals('5px 5px 5px -33px', $iconMargin);

        $iconPadding = $I->executeJS('var elm = document.querySelector(".advgb-list li");var style = window.getComputedStyle(elm, "::before");return style.getPropertyValue("padding");');
        $I->assertEquals('5px', $iconPadding);
    }
}