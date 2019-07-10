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

        $I->wantTo('Create a Advanced List block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Advanced List Block');

        // Insert block
        $I->insertBlock('Advanced List');
        $I->waitForElement('.advgb-list-item');

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
}