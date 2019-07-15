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
        $I->wait(1);
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "advgb-tab")][1]/a/span[text()="First tab"]');
        $I->seeElement('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "advgb-tab-body")][1]/p[text()="Lorem ipsum dono sit amet."]');
        $I->seeNumberOfElements('//div[contains(@class, "advgb-tabs-block")]/ul[contains(@class, "advgb-tabs-panel")]/li[contains(@class, "ui-state-default")]', 3);
        $I->seeNumberOfElementsInDOM('//div[contains(@class, "advgb-tabs-block")]/div[contains(@class, "ui-tabs-panel")]', 3);
    }
}