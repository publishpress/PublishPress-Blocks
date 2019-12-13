<?php

class InfoBoxBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-infobox-wrapper');
            $I->clickWithLeftButton('//div[contains(@class, "advgb-infobox-wrapper")]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createLoginBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Info Box block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Info Box');

        // Insert block
        $I->insertBlock('Info Box');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        $I->seeElement('//div[contains(@class, "advgb-infobox-wrapper")]');
    }

    public function changeContainerSettings(AcceptanceTester $I) {
        $I->wantTo('Change container settings block');

        //change bg color
        $containerBackground = '#dcd7ca';
        $I->clickAndWait('//h2/button[text()="Container Settings"]/parent::h2[@class="components-panel__body-title"]/parent::div[contains(@class, "components-panel__body")]//span[text()="Background"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($containerBackground);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-infobox-wrapper'); // click block to hide picker
        //change border color
        $containerBorderBackground = '#6d6d6d';
        $I->clickAndWait('//h2/button[text()="Container Settings"]/parent::h2[@class="components-panel__body-title"]/parent::div[contains(@class, "components-panel__body")]//span[text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($containerBorderBackground);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-infobox-wrapper'); // click block to hide picker

        $I->updatePost();

    }
}