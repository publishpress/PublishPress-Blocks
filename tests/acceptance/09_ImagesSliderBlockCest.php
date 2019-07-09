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
            $I->clickWithLeftButton('//div[@class="advgb-images-slider-block"]');
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
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Images Slider Block');

        // Insert block
        $I->insertBlock('Images Slider');

        $I->waitForText('Add images');
        $I->click('Add images');

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
}