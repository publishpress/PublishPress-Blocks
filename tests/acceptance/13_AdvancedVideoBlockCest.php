<?php

class AdvancedVideoBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-video-block');
            $I->clickWithLeftButton('//div[contains(@class, "advgb-video-block")]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createVideoBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Advanced Video block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Advanced Video Block');

        // Insert block
        $I->insertBlock('Advanced Video');
        $I->waitForElement('.advgb-video-block');

        // Fetch video
        $I->fillField('//div[@class="advgb-video-block"]//input', 'https://vimeo.com/264060718');
        $I->click('Fetch');

        $I->waitForElement('//div[@class="advgb-current-video-desc"]//span[@title="vimeo"]');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-video');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-video-block")][contains(@data-video, "264060718")][@data-source="vimeo"]');
    }
}