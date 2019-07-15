<?php

class AccordionBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-accordion-block');
            $I->clickWithLeftButton('//div[@data-type="advgb/accordion"][1]//h4');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createAccordionBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Accordion block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Accordion Block');

        // Insert block
        $I->insertBlock('Accordion');
        $I->waitForElement('.advgb-accordion-block');

        $I->fillField('//div[@data-type="advgb/accordion"]//div[@class="advgb-accordion-block"]//h4', 'Accordion title 1');
        $I->click('//div[@data-type="advgb/accordion"]//div[@class="advgb-accordion-block"]//div[@class="advgb-accordion-body"]//div[contains(@class, "editor-inner-blocks")]');
        $I->pressKeys('Flexi umentia agitabilis bene. Circumdare orbis iuga in locis convexi. Vesper mentisque alto neu. Levius circumdare perpetuum ventis aethere.');

        $I->pressKeys(\WebDriverKeys::DOWN);

        $I->insertBlock('Accordion');
        $I->waitForElement('.advgb-accordion-block');

        $I->fillField('//div[@data-type="advgb/accordion"][2]//div[@class="advgb-accordion-block"]//h4', 'Accordion title 2');
        $I->click('//div[@data-type="advgb/accordion"][2]//div[@class="advgb-accordion-block"]//div[@class="advgb-accordion-body"]//div[contains(@class, "editor-inner-blocks")]');
        $I->pressKeys('Dextra galeae moles. Erat: ponderibus valles circumdare tuti sic? Orbis limitibus recens titan inmensa extendi valles nisi aera.');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-accordion');

        // Check
        $I->seeNumberOfElements('.advgb-accordion-block', 2);
        $I->seeElement('.advgb-accordion-block .ui-accordion-header');
    }

    public function changeHeaderStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change accordion header styles');
        $headerBgColor = '#2196f3';
        $headerTextColor = '#000000';
        $headerIconColor = '#ffff00';
        $headerIconColorRgb = 'rgb(255, 255, 0)';

        // Change styles
        $I->click('//span[text()="Header Icon Style"]/following-sibling::node()/div[@class="advgb-icon-item"][2]');

        // Change colors
        $I->click('//button/span[text()="Color Settings"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($headerBgColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@data-type="advgb/accordion"][1]//h4'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($headerTextColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@data-type="advgb/accordion"][1]//h4'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Icon Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($headerIconColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@data-type="advgb/accordion"][1]//h4'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-accordion');

        // Check
        $I->seeElement('//div[contains(@class, "wp-block-advgb-accordion")][1]/div[contains(@class, "advgb-accordion-header")][contains(@style, "background-color:'.$headerBgColor.'")]');
        $I->seeElement('//div[contains(@class, "wp-block-advgb-accordion")][1]/div[contains(@class, "advgb-accordion-header")][contains(@style, "color:'.$headerTextColor.'")]');
        //$I->seeElementInDOM('//div[contains(@class, "wp-block-advgb-accordion")][1]/div[contains(@class, "advgb-accordion-header")]/span/*[@fill="#ffff00"]');
    }
}