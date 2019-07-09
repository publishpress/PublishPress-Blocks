<?php

class TestimonialBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-testimonial');
            $I->clickWithLeftButton('//div[@class="advgb-testimonial"]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createTestimonialBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Testimonial block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Testimonial Block');

        // Insert block
        $I->insertBlock('Testimonial');

        $I->waitForElement('//div[contains(@class, "advgb-testimonial")]');

        // Change person name
        $I->click('.advgb-testimonial .advgb-testimonial-item h4.advgb-testimonial-name');
        $I->selectCurrentElementText();
        $I->pressKeys('John Doe');

        // Change person position
        $I->click('.advgb-testimonial .advgb-testimonial-item p.advgb-testimonial-position');
        $I->selectCurrentElementText();
        $I->pressKeys('Developer');

        // Change person description
        $I->click('.advgb-testimonial .advgb-testimonial-item p.advgb-testimonial-desc');
        $I->selectCurrentElementText();
        $I->pressKeys('Coding is the passion of his life.');

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        // Check block loaded
        $I->waitForElement('.wp-block-advgb-testimonial');
        $I->seeElement('.advgb-testimonial-item');
        $I->seeElement('//div[@class="advgb-testimonial-item"]/h4[@class="advgb-testimonial-name"][text()="John Doe"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"]/p[@class="advgb-testimonial-position"][text()="Developer"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"]/p[@class="advgb-testimonial-desc"][text()="Coding is the passion of his life."]');
    }

    public function changeColumn(AcceptanceTester $I)
    {
        $I->wantTo('Change testimonial columns');

        // Change columns
        $I->fillField('//label[text()="Columns"]/following-sibling::node()/following-sibling::node()', 3);

        // Modify 2nd person
        $I->click('.advgb-testimonial .advgb-testimonial-item:nth-child(2) h4.advgb-testimonial-name');
        $I->selectCurrentElementText();
        $I->pressKeys('Tony Stark');

        $I->click('.advgb-testimonial .advgb-testimonial-item:nth-child(2) p.advgb-testimonial-position');
        $I->selectCurrentElementText();
        $I->pressKeys('Iron Man');

        $I->click('.advgb-testimonial .advgb-testimonial-item:nth-child(2) p.advgb-testimonial-desc');
        $I->selectCurrentElementText();
        $I->pressKeys('A super rich and clever person. Most adorable superhero. Respect!');

        // Modify 3rd person
        $I->click('.advgb-testimonial .advgb-testimonial-item:last-child h4.advgb-testimonial-name');
        $I->selectCurrentElementText();
        $I->pressKeys('Clark Kent');

        $I->click('.advgb-testimonial .advgb-testimonial-item:last-child p.advgb-testimonial-position');
        $I->selectCurrentElementText();
        $I->pressKeys('Superman');

        $I->click('.advgb-testimonial .advgb-testimonial-item:last-child p.advgb-testimonial-desc');
        $I->selectCurrentElementText();
        $I->pressKeys('An alien person. Come to earth from a meteor. He has many super powers.');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        // Check columns changed
        $I->seeNumberOfElements('.advgb-testimonial .advgb-testimonial-item', 3);

        // Check text
        $I->seeElement('//div[@class="advgb-testimonial-item"][2]/h4[@class="advgb-testimonial-name"][text()="Tony Stark"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"][2]/p[@class="advgb-testimonial-position"][text()="Iron Man"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"][2]/p[@class="advgb-testimonial-desc"][text()="A super rich and clever person. Most adorable superhero. Respect!"]');

        $I->seeElement('//div[@class="advgb-testimonial-item"][3]/h4[@class="advgb-testimonial-name"][text()="Clark Kent"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"][3]/p[@class="advgb-testimonial-position"][text()="Superman"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"][3]/p[@class="advgb-testimonial-desc"][text()="An alien person. Come to earth from a meteor. He has many super powers."]');
    }

    public function changeAvatarStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change testimonial avatar styles');

        // Change avatar styles
        $I->click('//button[text()="Avatar"]');
        // Change avatar color
        $I->click('//button/span[text()="Avatar Colors"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#2196f3');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial"]'); // click block to hide picker

        // Change border color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial"]'); // click block to hide picker

        // Change border radius
        $I->fillField('//label[text()="Border Radius (%)"]/following-sibling::node()/following-sibling::node()', 10);

        // Change border width
        $I->fillField('//label[text()="Border Width"]/following-sibling::node()/following-sibling::node()', 2);

        // Change avatar size
        $I->fillField('//label[text()="Avatar Size"]/following-sibling::node()/following-sibling::node()', 80);

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        // Check styles applied
        $I->seeElement('//div[@class="advgb-testimonial-avatar"][contains(@style, "background-color:#2196f3")]');
        $I->seeElement('//div[@class="advgb-testimonial-avatar"][contains(@style, "border-color:#ff0000")]');
        $I->seeElement('//div[@class="advgb-testimonial-avatar"][contains(@style, "border-radius:10%")]');
        $I->seeElement('//div[@class="advgb-testimonial-avatar"][contains(@style, "border-width:2px")]');
        $I->seeElement('//div[@class="advgb-testimonial-avatar"][contains(@style, "width:80px")]');
        $I->seeElement('//div[@class="advgb-testimonial-avatar"][contains(@style, "height:80px")]');
    }

    public function changeTextColors(AcceptanceTester $I)
    {
        $I->wantTo('Change testimonial text colors');

        // Change colors
        $I->click('//button/span[text()="Text Colors"]');
        // Change name color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Name Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#7b17ff');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial"]'); // click block to hide picker

        // Change position color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Position Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#999999');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial"]'); // click block to hide picker

        // Change name color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Description Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#00a32e');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial"]'); // click block to hide picker

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        // Check styles applied
        $I->seeElement('//h4[@class="advgb-testimonial-name"][contains(@style, "color:#7b17ff")]');
        $I->seeElement('//p[@class="advgb-testimonial-position"][contains(@style, "color:#999999")]');
        $I->seeElement('//p[@class="advgb-testimonial-desc"][contains(@style, "color:#00a32e")]');
    }
}