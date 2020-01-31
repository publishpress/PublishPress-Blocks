<?php

class NewsletterBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-newsletter-wrapper');
            $I->clickWithLeftButton('.advgb-newsletter-wrapper');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createNewsletterBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Newsletter block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        try {
            $I->waitForElementVisible('.edit-post-welcome-guide');
            $I->clickWithLeftButton('//button[@aria-label="Close dialog"]');
        } catch (Exception $e) {
            //not latest Gutenberg
        }
        try {
            $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');
        } catch (Exception $e) {}

        $I->fillField('.editor-post-title__input', 'Newsletter Block');

        // Insert block
        $I->insertBlock('Newsletter');
        $I->waitForElement('.advgb-newsletter-wrapper');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-newsletter');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]/form/div[@class="advgb-form-field"]/input[contains(@class, "advgb-form-input-email")]');
    }

    public function changeNewsletterStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change newsletter form styles');

        // Change
        $I->selectOption('//label[text()="Form style"]/following-sibling::node()', array('text' => 'Alternative'));
        $I->fillField('//label[text()="Form width (px)"]/following-sibling::node()/following-sibling::node()', 500);

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-newsletter');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-newsletter")][contains(@class, "style-alt")][contains(@style, "max-width:500px")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//input[contains(@class, "advgb-form-input-fname")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//input[contains(@class, "advgb-form-input-lname")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//input[contains(@class, "advgb-form-input-email")]');
    }

    public function changeTextHolder(AcceptanceTester $I)
    {
        $I->wantTo('Change newsletter form input placeholder');

        // Change
        $I->fillField('//label[text()="First Name input placeholder"]/following-sibling::node()', 'Your Name');
        $I->fillField('//label[text()="Last Name input placeholder"]/following-sibling::node()', 'Your Nickname');
        $I->fillField('//label[text()="Email input placeholder"]/following-sibling::node()', 'Your Email');
        $I->fillField('//label[text()="Submit text"]/following-sibling::node()', 'Subscribe');
        $I->fillField('//label[text()="Empty field warning text"]/following-sibling::node()', 'Not allow empty field!');
        $I->fillField('//label[text()="Submit success text"]/following-sibling::node()', 'Thanks for subscribe!');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-newsletter');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//input[contains(@class, "advgb-form-input-fname")][@placeholder="Your Name"]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//input[contains(@class, "advgb-form-input-lname")][@placeholder="Your Nickname"]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//input[contains(@class, "advgb-form-input-email")][@placeholder="Your Email"]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//button[contains(@class, "advgb-form-submit")][@data-alert="Not allow empty field!"]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//button[contains(@class, "advgb-form-submit")][@data-success="Thanks for subscribe!"]');
    }

    public function changeInputColors(AcceptanceTester $I)
    {
        $I->wantTo('Change newsletter form input colors');

        // Change
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#2196f3');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-newsletter-wrapper'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Text color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ffffff');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-newsletter-wrapper'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-newsletter');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//div[contains(@class, "advgb-form-field")]//input[contains(@class, "advgb-form-input")][contains(@style, "background-color:#2196f3")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//div[contains(@class, "advgb-form-field")]//input[contains(@class, "advgb-form-input")][contains(@style, "color:#ffffff")]');
    }

    public function changeBorderStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change newsletter form border styles');

        // Change
        $I->click('//button[text()="Border Settings"]');
        $I->click('//button/span[text()="Border Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-newsletter-wrapper'); // click block to hide picker

        $I->selectOption('//label[text()="Border Style"]/following-sibling::node()', array('text' => 'Dashed'));
        $I->fillField('//label[text()="Border radius (px)"]/following-sibling::node()/following-sibling::node()', 5);

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-newsletter');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//div[contains(@class, "advgb-form-field")]//input[contains(@class, "advgb-form-input")][contains(@style, "border-color:#ff0000")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//div[contains(@class, "advgb-form-field")]//input[contains(@class, "advgb-form-input")][contains(@style, "border-style:dashed")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//div[contains(@class, "advgb-form-field")]//input[contains(@class, "advgb-form-input")][contains(@style, "border-radius:5px")]');
    }

    public function changeSubmitButtonStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change newsletter form border styles');

        // Change
        $I->fillField('//label[text()="Button border radius"]/following-sibling::node()/following-sibling::node()', 5);

        $I->click('//button/span[text()="Color Settings"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border and Text"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#333333');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-newsletter-wrapper'); // click block to hide picker

        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#fcb900');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-newsletter-wrapper'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-newsletter');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//button[contains(@class, "advgb-form-submit")][contains(@style, "border-color:#333333")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//button[contains(@class, "advgb-form-submit")][contains(@style, "color:#333333")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//button[contains(@class, "advgb-form-submit")][contains(@style, "background-color:#fcb900")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//button[contains(@class, "advgb-form-submit")][contains(@style, "border-radius:5px")]');
    }
}