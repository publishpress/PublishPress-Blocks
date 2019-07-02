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

    public function changeWidthHeight(AcceptanceTester $I)
    {
        $I->wantTo('Change image width and height');

        // Back to edit post
        $I->click('Edit Post');
        $I->waitForElement('#editor');
        $I->waitForElement('.advgb-image-block');
        $I->clickWithLeftButton('//*[@class="advgb-image-block"]');

        // Change block width
        $I->waitForElementVisible('//label[text()="Width"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Width"]/following-sibling::node()/following-sibling::node()', 700);

        // Change block height
        $I->fillField('//label[text()="Height"]/following-sibling::node()/following-sibling::node()', 650);

        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->clickViewPost();

        // Check the actual width
        $width = $I->getElementWidth('//*[contains(@class,"wp-block-advgb-image")]');
        $I->assertEquals(700, $width);

        // Check the actual height
        $height = $I->getElementHeight('//*[contains(@class,"wp-block-advgb-image")]');
        $I->assertEquals(650, $height);
    }
}