<?php

class AdvancedImageBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-image-block');
            $I->clickWithLeftButton('//*[contains(@class,"advgb-image-block")]');
        } catch(Exception $e) {
            // do stuff
        }
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
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Advanced Image Block');

        // Insert block
        $I->insertBlock('Advanced Image');

        $I->waitForText('Choose image');
        $I->click('//div[contains(@class, "advgb-image-block")]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Hello world');
        $I->click('//div[contains(@class, "advgb-image-block")]//div[contains(@class, "editor-rich-text")][2]//p');
        $I->selectCurrentElementText();
        $I->pressKeys('Lorem ipsum');

        $I->click('Choose image');
        $I->waitForText('Media Library');
        $I->click('Media Library');
        $I->waitForElement('//div[@class="attachments-browser"]//ul/li[@aria-label="The Bubble Nebula"]');
        $I->click('//div[@class="attachments-browser"]//ul/li[@aria-label="The Bubble Nebula"]');
        $I->click('Select');

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        $I->seeElement('//div[contains(@class, "wp-block-advgb-image")][contains(@data-image, "galaxy.jpg")]');
    }

    public function changeFullWidth(AcceptanceTester $I) {
        $I->wantTo('Change image to Full width');

        $I->click('//label[text()="Full width"]/preceding-sibling::node()');

        $I->updatePost();
        $I->waitForElementVisible('.wp-block-advgb-image');

        $I->dontSeeElement('//div[contains(@class, "wp-block-advgb-image") and contains(@class, "full-width")]');
    }

    public function changeWidthHeight(AcceptanceTester $I)
    {
        $I->wantTo('Change image width and height');

        // Change block width
        $I->waitForElementVisible('//label[text()="Width"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Width"]/following-sibling::node()/following-sibling::node()', 700);

        // Change block height
        $I->fillField('//label[text()="Height"]/following-sibling::node()/following-sibling::node()', 650);

        $I->updatePost();

        // Check the actual width
        $width = $I->getElementWidth('//*[contains(@class,"wp-block-advgb-image")]');
        $I->assertEquals(700, $width);

        // Check the actual height
        $height = $I->getElementHeight('//*[contains(@class,"wp-block-advgb-image")]');
        $I->assertEquals(650, $height);
    }

    public function changeColor(AcceptanceTester $I)
    {
        $I->wantTo('Change image block color');
        $colors = array('#2196f3', '#ff0000', '#ffff00');

        // Change color
        $I->click('//button[contains(@class, "components-panel__body-toggle")]/span[text()="Color Settings"]');

        // Change title color
        $I->clickAndWait('//span[text()="Title Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($colors[0]);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//*[contains(@class, "advgb-image-block")]'); // click block to hide picker

        // Change subtitle color
        $I->clickAndWait('//span[text()="Subtitle Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($colors[1]);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//*[contains(@class, "advgb-image-block")]'); // click block to hide picker

        // Change overlay color
        $I->clickAndWait('//span[text()="Overlay Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($colors[2]);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//*[contains(@class, "advgb-image-block")]'); // click block to hide picker

        $I->updatePost();
        $I->waitForElementVisible('.wp-block-advgb-image');

        // Check for colors applied
        $I->seeElement('//div[contains(@class, "wp-block-advgb-image")]//h4[@class="advgb-image-title"][contains(@style, "color:'.$colors[0].'")]');
        $I->seeElement('//div[contains(@class, "wp-block-advgb-image")]//p[@class="advgb-image-subtitle"][contains(@style, "color:'.$colors[1].'")]');
        $I->seeElementInDOM('//div[contains(@class, "wp-block-advgb-image")]//a[@class="advgb-image-overlay"][contains(@style, "background-color:'.$colors[2].'")]');
    }

    public function changeTextPosition(AcceptanceTester $I)
    {
        $I->wantTo('Change image text position');

        // Change text position
        $I->click('//button[contains(@class, "components-panel__body-toggle")][text()="Text Alignment"]');
        $I->selectOption('//label[text()="Vertical Alignment"]/following-sibling::node()', array('text' => 'Bottom'));
        $I->selectOption('//label[text()="Horizontal Alignment"]/following-sibling::node()', array('text' => 'Left'));

        $I->updatePost();
        $I->waitForElementVisible('.wp-block-advgb-image');

        // Check text position
        $I->seeElement('//div[contains(@class, "wp-block-advgb-image")][contains(@style, "justify-content:flex-end")]');
        $I->seeElement('//div[contains(@class, "wp-block-advgb-image")][contains(@style, "align-items:flex-start")]');
    }

    public function changeFocalPointPicker(AcceptanceTester $I) {
        $I->wantTo('Change Focal point picker');

        //change horizontal position
        $I->fillField('//label[text()="Horizontal Pos."]/following-sibling::node()', 20);
        //change vertical position
        $I->fillField('//label[text()="Vertical Pos."]/following-sibling::node()', 40);

        $I->updatePost();
        $I->waitForElementVisible('.wp-block-advgb-image');

        $I->seeElement('//div[contains(@class, "wp-block-advgb-image")][contains(@style, "background-position:20% 40%")]');
    }

    public function changeOverlayOpacity(AcceptanceTester $I) {
        $I->wantTo('Change overlay opacity');

        //change overlay opacity
        $I->fillField('//label[text()="Overlay opacity default"]/following-sibling::node()/following-sibling::node()', 50);
        //change overlay opacity hover
        $I->fillField('//label[text()="Overlay opacity hover"]/following-sibling::node()/following-sibling::node()', 30);

        $I->updatePost();
        $I->waitForElementVisible('.wp-block-advgb-image');

        $opacity = $I->executeJS('return jQuery(".advgb-image-overlay").css("opacity")');
        $I->assertEquals($opacity, '0.5');

        // Check hover styles applied
        $I->moveMouseOver('//div[contains(@class, "advgb-image-block")]');
        $I->wait(1);
        $opacity_hover = $I->executeJS('return jQuery(".advgb-image-overlay").css("opacity")');
        $I->assertEquals($opacity_hover, '0.3');
    }
}