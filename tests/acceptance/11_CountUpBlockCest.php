<?php

class CountUpBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-count-up');
            $I->clickWithLeftButton('//div[contains(@class, "advgb-count-up")]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createCountUpBlock(AcceptanceTester $I)
    {

        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Count Up block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Count Up Block');

        // Insert block
        $I->insertBlock('Count Up');
        $I->waitForElement('.advgb-count-up');

        // Change text
        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-one"]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Visitors');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-one"]/div[2]//div');
        $I->selectCurrentElementText();
        $I->pressKeys('2345');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-one"]/div[3]//div');
        $I->selectCurrentElementText();
        $I->pressKeys('per day');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-count-up');

        // Check text
        $I->seeElement('//div[@class="advgb-count-up-columns-one"]/h4[@class="advgb-count-up-header"][text()="Visitors"]');
        $I->seeElement('//div[@class="advgb-count-up-columns-one"]/div/span[@class="advgb-counter-number"][text()="2345"]');
        $I->seeElement('//div[@class="advgb-count-up-columns-one"]/p[@class="advgb-count-up-desc"][text()="per day"]');
    }

    public function changeColumns(AcceptanceTester $I)
    {
        $I->wantTo('Change number of Count up columns');

        // Change columns
        $I->fillField('//label[text()="Columns"]/following-sibling::node()/following-sibling::node()', 3);

        // Change text
        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-two"]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Downloaded');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-two"]/div[2]//div');
        $I->selectCurrentElementText();
        $I->pressKeys('199');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-two"]/div[3]//div');
        $I->selectCurrentElementText();
        $I->pressKeys('times');

        // Change text
        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-three"]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Profit');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-three"]/div[2]//div');
        $I->selectCurrentElementText();
        $I->pressKeys('50000');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-three"]/div[3]//div');
        $I->selectCurrentElementText();
        $I->pressKeys('per month');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-count-up');

        // Check columns change
        $I->seeNumberOfElements('.advgb-count-up > div', 3);

        // Check text
        $I->seeElement('//div[@class="advgb-count-up-columns-two"]/h4[@class="advgb-count-up-header"][text()="Downloaded"]');
        $I->seeElement('//div[@class="advgb-count-up-columns-two"]/div/span[@class="advgb-counter-number"][text()="199"]');
        $I->seeElement('//div[@class="advgb-count-up-columns-two"]/p[@class="advgb-count-up-desc"][text()="times"]');

        // Check text
        $I->seeElement('//div[@class="advgb-count-up-columns-three"]/h4[@class="advgb-count-up-header"][text()="Profit"]');
        $I->seeElement('//div[@class="advgb-count-up-columns-three"]/div/span[@class="advgb-counter-number"][text()="50000"]');
        $I->seeElement('//div[@class="advgb-count-up-columns-three"]/p[@class="advgb-count-up-desc"][text()="per month"]');
    }

    public function changeColors(AcceptanceTester $I)
    {
        $I->wantTo('Change colors of text and number size');
        $headerColor = '#2196f3';
        $numberColor = '#ff0000';
        $descColor = '#06a132';

        // Change colors
        $I->click('//button/span[text()="Color Settings"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Header Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($headerColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "advgb-count-up")]'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Count Up Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($numberColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "advgb-count-up")]'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Description Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($descColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "advgb-count-up")]'); // click block to hide picker

        // Change number size
        $I->fillField('//label[text()="Counter Number Size"]/following-sibling::node()/following-sibling::node()', 70);

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-count-up');

        // Check changes applied
        $I->seeElement('//div[contains(@class, "advgb-count-up")]/div/h4[@class="advgb-count-up-header"][contains(@style, "color:'.$headerColor.'")]');
        $I->seeElement('//div[contains(@class, "advgb-count-up")]/div/p[@class="advgb-count-up-desc"][contains(@style, "color:'.$descColor.'")]');
        $I->seeElement('//div[contains(@class, "advgb-count-up")]/div/div[@class="advgb-counter"][contains(@style, "color:'.$numberColor.'")]');
        $I->seeElement('//div[contains(@class, "advgb-count-up")]/div/div[@class="advgb-counter"][contains(@style, "font-size:70px")]');
    }

    public function addCounterSymbol(AcceptanceTester $I)
    {
        $I->wantTo('Add symbol to counter number');

        // Add symbol
        $I->fillField('//div[text()="Counter Up Symbol"]/following-sibling::node()/following-sibling::node()//input[@class="components-text-control__input"]', 'K');
        $I->click('//div[text()="Counter Up Symbol"]/following-sibling::node()/following-sibling::node()/span[@class="components-form-toggle"]');

        $I->fillField('//div[text()="Counter Up Symbol"]/following-sibling::node()/following-sibling::node()/following-sibling::node()//input[@class="components-text-control__input"]', '$');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-count-up');

        // Check changes
        $I->seeElement('//div[contains(@class, "advgb-count-up")]/div[2]/div[@class="advgb-counter"]/span[2][text()="K"]');
        $I->seeElement('//div[contains(@class, "advgb-count-up")]/div[3]/div[@class="advgb-counter"]/span[1][text()="$"]');
    }
}