<?php

class MapBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-map-block');
            $I->clickWithLeftButton('//*[@class="advgb-map-block"]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createMapBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Map block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Advanced Map Block');

        // Insert block
        $I->insertBlock('Map');

        $I->dontSee('No API Key Provided!');

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->clickViewPost();

        // Check map block exist and loaded
        $I->seeElement('//div[contains(@class, "wp-block-advgb-map")]/div[@class="advgb-map-content"]/div');
    }
}