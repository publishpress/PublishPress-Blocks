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

    public function changeColors(AcceptanceTester $I)
    {
        $I->wantTo('Change video block colors');

        // Change colors
        $I->click('//button/span[text()="Color Settings"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Overlay Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#2196f3');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "advgb-video-block")]'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Play Button Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "advgb-video-block")]'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-video');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-video-block")]/div[contains(@class, "advgb-video-wrapper")][contains(@style, "background-color:#2196f3")]');
        $I->seeElement('//div[contains(@class, "advgb-video-block")]//div[@class="advgb-play-button"][contains(@style, "color:#ff0000")]');
    }
}