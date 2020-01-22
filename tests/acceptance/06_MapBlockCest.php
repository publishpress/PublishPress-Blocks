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
        $I->waitForElementVisible('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close dialog"]');

        $I->fillField('.editor-post-title__input', 'Advanced Map Block');

        // Insert block
        $I->insertBlock('Map');

        $I->dontSee('No API Key Provided!');

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        // Check map block exist and loaded
        $I->seeElement('//div[contains(@class, "wp-block-advgb-map")]/div[@class="advgb-map-content"]/div');
    }

    public function changeMapLocationUsingAddress(AcceptanceTester $I)
    {
        $I->wantTo('Change location using address');

        // Change location using address input
        $I->fillField('//label[text()="Address"]/following-sibling::node()', 'Hanoi');
        $I->click('//button[text()="Fetch Location"]');
        $I->waitForText('Hanoi, Vietnam');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-map');

        // Check location
        $I->seeElement('//div[@class="advgb-map-content"][@data-lat="21.0277644"][@data-lng="105.8341598"]/div');
    }

    public function changeMapLocationUsingLatLng(AcceptanceTester $I)
    {
        $I->wantTo('Change location using lat/lng');
        // Statue of Liberty address
        $lat = '40.6892494';
        $lng = '-74.0445004';

        // Change location using address input
        $I->click('Use Lat/Lng');
        $I->waitForElement('//input[@title="Latitude"]');
        $I->fillField('//input[@title="Latitude"]', $lat);
        $I->fillField('//input[@title="Longitude"]', $lng);

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-map');

        // Check location
        $I->seeElement('//div[@class="advgb-map-content"][@data-lat="'.$lat.'"][@data-lng="'.$lng.'"]/div');
    }

    public function changeMapHeightAndZoom(AcceptanceTester $I)
    {
        $I->wantTo('Change height and zoom level of the map');
        $zoom = 12;
        $height = 500;

        // Change height
        $I->fillField('//label[text()="Zoom level"]/following-sibling::node()/following-sibling::node()', $zoom);
        $I->fillField('//label[text()="Height"]/following-sibling::node()/following-sibling::node()', $height);

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-map');

        // Check zoom level
        $I->seeElement('//div[@class="advgb-map-content"][@data-zoom="'.$zoom.'"]/div');

        // Check height
        $eHeight = $I->getElementHeight('//div[@class="advgb-map-content"]');
        $I->assertEquals($eHeight, $height);
    }

    public function changeMarkerIcon(AcceptanceTester $I)
    {
        $I->wantTo('Change map marker icon');

        // Change map marker icon
        $I->click('Choose icon');
        $I->waitForText('Media Library');
        $I->click('Media Library');
        $I->waitForElement('//div[@class="attachments-browser"]//ul/li[@aria-label="marker"]');
        $I->click('//div[@class="attachments-browser"]//ul/li[@aria-label="marker"]');
        $I->click('Select');

        $I->wait(0.5);

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-map');

        // Check marker icon
        $I->seeElement('//div[@class="advgb-map-content"][contains(@data-icon, "marker.png")]/div');
    }

    public function changeMarkerText(AcceptanceTester $I) {
        $I->wantTo('Change map marker title and description');

        // Change title
        $title = 'Statue of Liberty';
        $I->fillField('//label[text()="Marker Title"]/following-sibling::node()', $title);

        // Change description
        $desc = 'The symbol of USA';
        $I->fillField('//label[text()="Marker description"]/following-sibling::node()', $desc);

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-map');

        // Check marker text
        $I->seeElement('//div[@class="advgb-map-content"][@data-title="'.$title.'"][@data-desc="'.$desc.'"]/div');
    }

    public function changeMapStyle(AcceptanceTester $I) {
        $I->wantTo('Change map color style');

        // Change color style
        $I->selectOption('//label[text()="Map styles"]/following-sibling::node()', array('text' => 'Night'));

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-map');

        // Check map color
        $I->seeElement('//div[@class="advgb-map-content"][contains(@data-style, "242f3e")]/div');
    }
}