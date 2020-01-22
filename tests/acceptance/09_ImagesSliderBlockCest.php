<?php

class ImagesSliderBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-images-slider-block');
            $I->clickWithLeftButton('//div[contains(@aria-label, "Block: Images Slider")]', -3, 0);
//            $I->clickAndWait('//button[contains(@aria-label, "Block Navigation")]', 0.5);
//            $I->click('//button[text()="Images Slider"]');
            //$I->clickWithLeftButton('//ul[@class="slick-dots"]', 50, 95);
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createImagesSliderBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Images Slider block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->waitForElementVisible('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close dialog"]');

        $I->fillField('.editor-post-title__input', 'Images Slider Block');

        // Insert block
        $I->insertBlock('Images Slider');

        $I->waitForText('Add images');
        $I->click('Add images');

        $I->waitForText('Media Library');
        $I->click('Media Library');

        // Add some images
        $I->waitForElement('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="vineyard"]');
        $I->click('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="vineyard"]');
        $I->clickAndWait('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//button[contains(@class, "media-button-select")]');
        $I->fillField('//div[@class="advgb-image-slider-control"]//input', 'Vineyard');
        $I->fillField('//div[@class="advgb-image-slider-control"][2]//textarea', 'Vine field in the sunset');

        $I->click('//div[@class="advgb-image-slider-add-item"]//button');
        $I->waitForElement('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="road"]');
        $I->click('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="road"]');
        $I->clickAndWait('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//button[contains(@class, "media-button-select")]');
        $I->clickAndWait('//div[contains(@class, "advgb-image-slider-image-list-item")][2]');
        $I->fillField('//div[@class="advgb-image-slider-control"]//input', 'Road');
        $I->fillField('//div[@class="advgb-image-slider-control"][2]//textarea', 'Beautiful highway');

        $I->click('//div[@class="advgb-image-slider-add-item"]//button');
        $I->waitForElement('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="field"]');
        $I->click('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="field"]');
        $I->clickAndWait('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//button[contains(@class, "media-button-select")]');
        $I->clickAndWait('//div[contains(@class, "advgb-image-slider-image-list-item")][3]');
        $I->fillField('//div[@class="advgb-image-slider-control"]//input', 'Field');
        $I->fillField('//div[@class="advgb-image-slider-control"][2]//textarea', 'A peace green field');
        $I->wait(0.1);

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        // Check block show on frontend
        $I->waitForElement('.wp-block-advgb-images-slider');
        $I->seeElement('//div[contains(@class, "advgb-images-slider")]/div[contains(@class, "slick-list")]/div[contains(@class, "slick-track")]/*');
    }

    public function changeSliderColors(AcceptanceTester $I)
    {
        $I->wantTo('Change image slider colors');

        // Change colors
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Hover Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#044d88');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-images-slider-block"]'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Title Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-images-slider-block"]'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ffff00');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-images-slider-block"]'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-images-slider');

        // Check color applied
        $I->waitForElement('.slick-track');
        $I->moveMouseOver('.advgb-images-slider');
        $I->seeElement('//div[contains(@class, "advgb-image-slider-item")]/div[@class="advgb-image-slider-item-info"]/a[@class="advgb-image-slider-overlay"][contains(@style, "background-color:#044d88")]');
        $I->seeElement('//div[contains(@class, "advgb-image-slider-item")]/div[@class="advgb-image-slider-item-info"]/h4[@class="advgb-image-slider-title"][contains(@style, "color:#ff0000")]');
        $I->seeElement('//div[contains(@class, "advgb-image-slider-item")]/div[@class="advgb-image-slider-item-info"]/p[@class="advgb-image-slider-text"][contains(@style, "color:#ffff00")]');
    }

    public function changeTextPosition(AcceptanceTester $I)
    {
        $I->wantTo('Change position of images text');

        // Change position
        $I->click('//button[text()="Text Alignment"]');
        $I->selectOption('//label[text()="Vertical Alignment"]/following-sibling::node()', array('text' => 'Top'));
        $I->selectOption('//label[text()="Horizontal Alignment"]/following-sibling::node()', array('text' => 'Right'));

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-images-slider');
        $I->waitForElement('.slick-track');

        // Check position change
        $I->seeElement('//div[contains(@class, "advgb-image-slider-item")]/div[@class="advgb-image-slider-item-info"][contains(@style, "justify-content:flex-start")]');
        $I->seeElement('//div[contains(@class, "advgb-image-slider-item")]/div[@class="advgb-image-slider-item-info"][contains(@style, "align-items:flex-end")]');
    }

    public function changeSliderSize(AcceptanceTester $I)
    {
        $I->wantTo('Change width and height of slider');

        // Change size
        $I->click('//label[text()="Full width"]/preceding-sibling::node()');
        $I->click('//label[text()="Auto height"]/preceding-sibling::node()');

        $I->fillField('//label[text()="Width"]/following-sibling::node()/following-sibling::node()', 500);
        $I->fillField('//label[text()="Height"]/following-sibling::node()/following-sibling::node()', 350);

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-images-slider');
        $I->waitForElement('.slick-track');

        // Check size change
        $I->seeElement('//div[contains(@class, "advgb-image-slider-item")]/img[@class="advgb-image-slider-img"][contains(@style, "width:500px")]');
        $I->seeElement('//div[contains(@class, "advgb-image-slider-item")]/img[@class="advgb-image-slider-img"][contains(@style, "height:350px")]');
    }
}