<?php

class AdvancedButtonBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.wp-block-advgb-button_link');
            $I->clickWithLeftButton('//*[contains(@class, "wp-block-advgb-button_link")]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createButtonBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Adv Button block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Advanced Button Block');

        // Insert block
        $I->insertBlock('Advanced Button');

        $I->waitForElement('//div[contains(@class, "wp-block-advgb-button_link")]');
        $I->pressKeys('Button Text');

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->clickViewPost();

        // Check button rendered
        $I->seeElement('//a[contains(@class, "wp-block-advgb-button_link")][text()="Button Text"]');
    }
}