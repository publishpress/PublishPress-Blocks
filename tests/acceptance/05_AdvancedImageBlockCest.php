<?php

class AdvancedImageBlockCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createAdvancedImageBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create an advanced image block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Advanced Image Block');

        // Insert block
        $I->insertBlock('Advanced Image');

        $I->waitForText('Choose image');
        $I->click('//div[@class="advgb-image-block"]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Hello world');
        $I->click('//div[contains(@class, "advgb-image-block")]//div[contains(@class, "editor-rich-text")][2]//p');
        $I->selectCurrentElementText();
        $I->pressKeys('Lorem ipsum');

        $I->click('Choose image');
        $I->click('Media Library');
        $I->waitForElement('//div[@class="attachments-browser"]//ul/li[@aria-label="The Bubble Nebula"]');
        $I->click('//div[@class="attachments-browser"]//ul/li[@aria-label="The Bubble Nebula"]');
        $I->click('Select');

        $I->wait(1);
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->clickViewPost();

        $I->seeElement('//div[contains(@class, "wp-block-advgb-image")][contains(@data-image, "galaxy.jpg")]');
    }
}