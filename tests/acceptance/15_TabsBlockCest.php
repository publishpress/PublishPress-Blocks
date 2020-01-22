<?php

class TabsBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-tabs-wrapper');
            $I->click('//ul[@class="advgb-tabs-panel"]/li[1]//p');
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
        $I->waitForElementVisible('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close"]');

        $I->fillField('.editor-post-title__input', 'Tabs Block');

        // Insert block
        $I->insertBlock('Tabs');
        $I->waitForElement('.advgb-tabs-wrapper');

        // Change text
        $I->click('.advgb-tabs-wrapper .advgb-tabs-panel li.advgb-tab:first-child p');
        $I->selectCurrentElementText();
        $I->pressKeys('First tab');

        // Change text
        $I->click('//div[contains(@class, "advgb-tabs-wrapper")]/div[contains(@class, "advgb-tab-body")][1]//p');
        $I->selectCurrentElementText();
        $I->pressKeys('Lorem ipsum dono sit amet.');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-adv-tabs');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][1]/a/span[text()="First tab"]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/div[contains(@class, "advgb-tab-body-wrapper")]/div[1]/div[contains(@class, "advgb-tab-body") and contains(@class, "ui-tabs-panel")]/p[text()="Lorem ipsum dono sit amet."]');
        $I->seeNumberOfElements('//div[contains(@class, "advgb-tabs-wrapper")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "ui-state-default")]', 3);
        $I->seeNumberOfElements('//div[contains(@class, "advgb-tabs-wrapper")]/div[contains(@class, "advgb-tab-body-wrapper")]/div', 3);
    }

    public function changeHeaderStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change tabs header styles');
        $tabBgColor = '#999999';
        $tabTextColor = '#ffff00';
        $activeBgColor = '#006da3';
        $activeBgColorRgb = 'rgb(0, 109, 163)';
        $activeTextColor = '#000000';
        $activeTextColorRgb = 'rgb(0, 0, 0)';

        // Change
        $I->click('//button/span[text()="Tab Colors"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($tabBgColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-wrapper'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($tabTextColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-wrapper'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Active Tab Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($activeBgColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-wrapper'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Active Tab Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($activeTextColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-wrapper'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-adv-tabs');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][2][contains(@style, "background-color:'.$tabBgColor.'")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][2]/a[contains(@style, "color:'.$tabTextColor.'")]');
        $I->waitForElement('li.advgb-tab.ui-tabs-active'); // wait for js loaded
        $I->wait(0.5);

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
        $I->clickWithLeftButton('.advgb-tabs-wrapper'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($bodyTextColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-tabs-wrapper'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-adv-tabs');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/div[contains(@class, "advgb-tab-body")][contains(@style, "background-color:'.$bodyBgColor.'")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/div[contains(@class, "advgb-tab-body")][contains(@style, "color:'.$bodyTextColor.'")]');
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
        $I->clickWithLeftButton('.advgb-tabs-wrapper'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-adv-tabs');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][contains(@style, "border-color:#ff0000")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/div[contains(@class, "advgb-tab-body")][contains(@style, "border-color:#ff0000")]');

        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][contains(@style, "border-style:dashed")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/div[contains(@class, "advgb-tab-body")][contains(@style, "border-style:dashed")]');

        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][contains(@style, "border-width:2px")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/div[contains(@class, "advgb-tab-body")][contains(@style, "border-width:2px")]');

        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][contains(@style, "border-radius:10px")]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/div[contains(@class, "advgb-tab-body")][contains(@style, "border-radius:10px")]');
    }

    public function changeTabStyle(AcceptanceTester $I) {
        $I->wantTo('Change tabs style');

        //change desktop style
        $I->click('//div[contains(@class,"advgb-columns-responsive-item") and text()="desktop"]');
        $I->click('//button[contains(@class,"advgb-tabs-style")][2]');
        //change tablet style
        $I->click('//div[contains(@class,"advgb-columns-responsive-item") and text()="tablet"]');
        $I->click('//button[contains(@class,"advgb-tabs-style")][1]');
        //change mobile style
        $I->click('//div[contains(@class,"advgb-columns-responsive-item") and text()="mobile"]');
        $I->click('//button[contains(@class,"advgb-tabs-style")][2]');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-adv-tabs');

        $I->seeElement('//div[contains(@class, "wp-block-advgb-adv-tabs") and contains(@class, "advgb-tab-vert-desktop advgb-tab-horz-tablet advgb-tab-vert-mobile")]');
    }

    public function changeInitialOpenTab(AcceptanceTester $I) {
        $I->wantTo('Change initial tab open');

        $I->selectOption('//label[text()="Initial Open Tab"]/following-sibling::node()', array('text' => 'Tab 2'));

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-adv-tabs');

        $I->seeElement('//div[contains(@class, "advgb-tabs-wrapper")]/ul[1]/li[2][contains(@class, "ui-tabs-active ui-state-active")]');
        $tab1Display = $I->executeJS('return jQuery(".wp-block-advgb-tab").eq(0).find(".advgb-tab-body").css("display");');
        $I->assertEquals($tab1Display, 'none');
        $tab2Display = $I->executeJS('return jQuery(".wp-block-advgb-tab").eq(1).find(".advgb-tab-body").css("display");');
        $I->assertEquals($tab2Display, 'block');
        $tab3Display = $I->executeJS('return jQuery(".wp-block-advgb-tab").eq(2).find(".advgb-tab-body").css("display");');
        $I->assertEquals($tab3Display, 'none');
    }
}