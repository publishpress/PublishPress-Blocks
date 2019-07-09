<?php

class SocialLinksBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-social-links-block');
            $I->clickWithLeftButton('//div[@class="advgb-social-links-block"]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createSocialLinksBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Social Links block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Social Links Block');

        // Insert block
        $I->insertBlock('Social Links');
        $I->waitForElement('.advgb-social-links-block');

        // Change icon
        $I->click('//div[@class="advgb-icon-items-wrapper"]/div[@class="advgb-icon-item"][2]'); // facebook icon

        $I->click('//button/span[text()="Preset Icon Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Preset Icon Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#2196f3');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-social-links-block"]'); // click block to hide picker

        $I->click('//div[@class="advgb-social-link"]//input');
        $I->selectCurrentElementText();
        $I->pressKeys('https://facebook.com');

        $I->wait(0.1);

        // Change target
        $I->click('//div[@class="advgb-social-icons"]/span[contains(@class, "advgb-social-icon")][2]');
        $I->click('//div[@class="advgb-icon-items-wrapper"]/div[@class="advgb-icon-item"][16]'); // youtube icon

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Preset Icon Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-social-links-block"]'); // click block to hide picker

        $I->click('//div[@class="advgb-social-link"]//input');
        $I->selectCurrentElementText();
        $I->pressKeys('https://youtube.com');

        $I->wait(0.1);

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-social-links');

        // Check block loaded
        $I->seeElement('//div[@class="advgb-social-icons"]/a[@class="advgb-social-icon"][1][contains(@style, "color:#2196f3")]');
        $I->seeElement('//div[@class="advgb-social-icons"]/a[@class="advgb-social-icon"][1][@href="https://facebook.com"]');

        $I->seeElement('//div[@class="advgb-social-icons"]/a[@class="advgb-social-icon"][2][contains(@style, "color:#ff0000")]');
        $I->seeElement('//div[@class="advgb-social-icons"]/a[@class="advgb-social-icon"][2][@href="https://youtube.com"]');
    }

    public function addCustomIcon(AcceptanceTester $I)
    {
        $I->wantTo('Add custom icon');

        // Add icon
        $I->click('//button[@aria-label="Add item"]');
        $I->seeNumberOfElements('.advgb-social-icons .advgb-social-icon', 4);
        $I->click('//div[@class="advgb-social-icons"]/span[contains(@class, "advgb-social-icon")][4]');
        $I->click('Upload/Choose');
        $I->click('Media Library');
        $I->waitForElement('//div[@class="attachments-browser"]//ul/li[@aria-label="marker"]');
        $I->click('//div[@class="attachments-browser"]//ul/li[@aria-label="marker"]');
        $I->click('Select');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-social-links');

        // Check icon loaded
        $I->seeElement('//div[@class="advgb-social-icons"]/a[@class="advgb-social-icon"][4]/img[contains(@src, "marker.png")]');
    }
}