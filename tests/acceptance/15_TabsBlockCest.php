<?php

class TabsBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-tabs-block');
            $I->clickWithLeftButton('.advgb-tabs-block');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createTabsBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Tabs block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Tabs Block');

        // Insert block
        $I->insertBlock('Tabs');
        $I->waitForElement('.advgb-tabs-block');

        // Change text
        $I->click('.advgb-tabs-block .advgb-tabs-panel li.advgb-tab:first-child p');
        $I->selectCurrentElementText();
        $I->pressKeys('First tab');

        // Change text
        $I->click('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "advgb-tab-body")][1]//p');
        $I->selectCurrentElementText();
        $I->pressKeys('Lorem ipsum dono sit amet.');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-tabs');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][1]/a/span[text()="First tab"]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "advgb-tab-body")][1]/p[text()="Lorem ipsum dono sit amet."]');
        $I->seeNumberOfElements('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "ui-state-default")]', 3);
        $I->seeNumberOfElementsInDOM('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "ui-tabs-panel")]', 3);
    }

    public function changeHeaderStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change tabs header styles');
        $tabBgColor = '#999999';
        $tabTextColor = '#ffff00';
        $activeBgColor = '#006da3';
        $activeBgColorRgb = 'rgb(0, 109, 163)';
        $activeTextColor = '#00ffff';
        $activeTextColorRgb = 'rgb(0, 255, 255)';

        // Change
        $I->click('//button/span[text()="Tab Colors"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($tabBgColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-block'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($tabTextColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-block'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Active Tab Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($activeBgColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-block'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Active Tab Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($activeTextColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-block'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-tabs');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][2][contains(@style, "background-color:'.$tabBgColor.'")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][2]/a[contains(@style, "color:'.$tabTextColor.'")]');

        $tabActiveBgColor = $I->executeJS('return jQuery("li.advgb-tab.ui-tabs-active").css("background-color")');
        $I->assertEquals($activeBgColorRgb, $tabActiveBgColor);

        $tabActiveTextColor = $I->executeJS('return jQuery("li.advgb-tab.ui-tabs-active a").css("color")');
        $I->assertEquals($activeTextColorRgb, $tabActiveTextColor);
    }

    public function changeBodyStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change tabs body styles');
        $bodyBgColor = '#2196f3';
        $bodyTextColor = '#ffffff';

        // Change
        $I->click('//button/span[text()="Body Colors"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($bodyBgColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-block'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($bodyTextColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-block'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-tabs');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "advgb-tab-body")][contains(@style, "background-color:'.$bodyBgColor.'")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "advgb-tab-body")][contains(@style, "color:'.$bodyTextColor.'")]');
    }

    public function changeBorderStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change tabs border styles');

        //Change
        $I->click('//button[text()="Border Settings"]');
        $I->selectOption('//label[text()="Border Style"]/following-sibling::node()', array('text' => 'Dashed'));
        $I->fillField('//label[text()="Border width"]/following-sibling::node()/following-sibling::node()', 2);
        $I->fillField('//label[text()="Border radius"]/following-sibling::node()/following-sibling::node()', 10);

        $I->click('//button/span[text()="Border Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-block'); // click block to hide picker

        $I->updatePost();

        // Check
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][contains(@style, "border-color:#ff0000")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "advgb-tab-body")][contains(@style, "border-color:#ff0000")]');

        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][contains(@style, "border-style:dashed")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "advgb-tab-body")][contains(@style, "border-style:dashed")]');

        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][contains(@style, "border-width:2px")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "advgb-tab-body")][contains(@style, "border-width:2px")]');

        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][contains(@style, "border-radius:10px")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "advgb-tab-body")][contains(@style, "border-radius:10px")]');
    }
}