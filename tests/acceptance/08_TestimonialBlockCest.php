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
        $I->waitForElementVisible('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close"]');

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
        $I->wait(1);

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        // Check block loaded
        $I->waitForElement('.wp-block-advgb-testimonial');
        $I->seeElement('.advgb-testimonial-item');
        $I->seeElement('//div[@class="advgb-testimonial-item"]/div[@class="advgb-testimonial-info"]/h4[@class="advgb-testimonial-name"][text()="John Doe"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"]/div[@class="advgb-testimonial-info"]/p[@class="advgb-testimonial-position"][text()="Developer"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"]/div[@class="advgb-testimonial-info"]/p[@class="advgb-testimonial-desc"][text()="Coding is the passion of his life."]');
    }

    public function changeColumn(AcceptanceTester $I)
    {
        $I->wantTo('Change testimonial columns');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

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
        $I->wait(1);

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        // Check columns changed
        $I->seeNumberOfElements('.advgb-testimonial .advgb-testimonial-item', 3);

        // Check text
        $I->seeElement('//div[@class="advgb-testimonial-item"][2]/div[@class="advgb-testimonial-info"]/h4[@class="advgb-testimonial-name"][text()="Tony Stark"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"][2]/div[@class="advgb-testimonial-info"]/p[@class="advgb-testimonial-position"][text()="Iron Man"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"][2]/div[@class="advgb-testimonial-info"]/p[@class="advgb-testimonial-desc"][text()="A super rich and clever person. Most adorable superhero. Respect!"]');

        $I->seeElement('//div[@class="advgb-testimonial-item"][3]/div[@class="advgb-testimonial-info"]/h4[@class="advgb-testimonial-name"][text()="Clark Kent"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"][3]/div[@class="advgb-testimonial-info"]/p[@class="advgb-testimonial-position"][text()="Superman"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"][3]/div[@class="advgb-testimonial-info"]/p[@class="advgb-testimonial-desc"][text()="An alien person. Come to earth from a meteor. He has many super powers."]');
    }

    public function changeAvatarStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change testimonial avatar styles');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // Change avatar styles
        $I->click('//button[text()="Avatar"]');
        // Change avatar color
        $I->click('//button/span[text()="Avatar Colors"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#2196f3');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial-wrapper"]'); // click block to hide picker

        // Change border color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial-wrapper"]'); // click block to hide picker

        // Change border radius
        $I->click('//label[text()="Border Radius (%)"]/following-sibling::node()/following-sibling::node()');
        $I->selectCurrentElementText();
        $I->pressKeys(WebDriverKeys::DELETE);
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

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // Change colors
        $I->click('//button/span[text()="Text Colors"]');
        // Change name color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Name Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#7b17ff');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial-wrapper"]'); // click block to hide picker

        // Change position color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Position Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#999999');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial-wrapper"]'); // click block to hide picker

        // Change name color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Description Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#00a32e');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial-wrapper"]'); // click block to hide picker

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        // Check styles applied
        $I->seeElement('//h4[@class="advgb-testimonial-name"][contains(@style, "color:#7b17ff")]');
        $I->seeElement('//p[@class="advgb-testimonial-position"][contains(@style, "color:#999999")]');
        $I->seeElement('//p[@class="advgb-testimonial-desc"][contains(@style, "color:#00a32e")]');
    }

    public function changeToSliderView(AcceptanceTester $I)
    {
        $I->wantTo('Change testimonial to slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // Change to slider view
        $I->click('//label[text()="Slider view"]/preceding-sibling::node()');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        // Check view type
        $I->seeElement('//div[contains(@class, "advgb-testimonial")]/div[contains(@class, "slick-list")]/div[contains(@class, "slick-track")]/*');
    }

    public function changeAutoPlaySliderSetting(AcceptanceTester $I) {
        $I->wantTo('Change auto play slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // click open slider settings
        $I->click('//button[text()="Slider Settings"]');
        // Change to slider view
        $I->click('//label[text()="Auto play"]/preceding-sibling::node()');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');
        $I->seeElement('//div[@class="slick-track"]/div[2][contains(@class, "slick-active")]');
        $I->wait(2.5);
        $I->seeElement('//div[@class="slick-track"]/div[2][contains(@class, "slick-active")]');
        $I->dontSeeElement('//div[@class="slick-track"]/div[3][contains(@class, "slick-active")]');
    }

    public function changeLoopSliderSetting(AcceptanceTester $I) {
        $I->wantTo('Change loop slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // click open slider settings
        $I->click('//button[text()="Slider Settings"]');
        // Change to slider view
        $I->click('//label[text()="Infinite Loop"]/preceding-sibling::node()');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');
        $I->dontSeeElement('//div[@class="slick-track"]/div[1][contains(@class, "slick-cloned")]');
    }

    public function changeCenterModeSliderSetting(AcceptanceTester $I) {
        $I->wantTo('Change center mode slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // click open slider settings
        $I->click('//button[text()="Slider Settings"]');

        // Change to slider center mode
        $I->click('//label[text()="Center mode"]/preceding-sibling::node()');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');
        $I->seeElement('//div[@class="slick-track"]/div[1][contains(@class, "slick-center")]');
    }



    public function changeTransitionSpeedSliderSetting(AcceptanceTester $I) {
        $I->wantTo('Change transition speed slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // click open slider settings
        $I->click('//button[text()="Slider Settings"]');

        // Change to slider center mode
        $I->click('//label[text()="Center mode"]/preceding-sibling::node()');

        $I->fillField('//label[text()="Transition speed (ms)"]/following-sibling::node()/following-sibling::node()', 3000);

        $I->waitForElement('.slick-track');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');

        $I->seeElement('//div[@class="slick-track"]/div[contains(@class, "advgb-testimonial-item") and contains(@tabindex, "0")][1]');
        $I->click('//button[contains(@class, "advgb-slider-next")]');
        $I->wait(3.5);
        $I->seeElement('//div[@class="slick-track"]/div[contains(@class, "advgb-testimonial-item") and contains(@tabindex, "-1")][1]');
    }

    public function changeShowDotsSliderSetting(AcceptanceTester $I) {
        $I->wantTo('Change show dots slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // click open slider settings
        $I->click('//button[text()="Slider Settings"]');

        // Change to slider view
        $I->click('//label[text()="Show dots"]/preceding-sibling::node()');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');
        $I->dontSeeElement('//ul[@class="slick-dots"]');
    }

    public function changeShowArrowsSliderSetting(AcceptanceTester $I) {
        $I->wantTo('Change show arrows slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // click open slider settings
        $I->click('//button[text()="Slider Settings"]');

        // Change to slider view
        $I->click('//label[text()="Show arrows"]/preceding-sibling::node()');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');
        $I->dontSeeElement('//button[contains(@class, "advgb-slider-arrow")]');
    }

    public function changeArrowStyleSliderSetting(AcceptanceTester $I) {
        $I->wantTo('Change arrow style slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // click open slider settings
        $I->click('//button[text()="Slider Settings"]');

        // Change to slider view
        $I->click('//label[text()="Show arrows"]/preceding-sibling::node()');

        $I->fillField('//label[text()="Arrow size"]/following-sibling::node()/following-sibling::node()', 55);

        $I->fillField('//label[text()="Arrow border size"]/following-sibling::node()/following-sibling::node()', 2);

        $I->fillField('//label[text()="Arrow border radius (%)"]/following-sibling::node()/following-sibling::node()', 10);

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');
        $I->seeElement('//button[contains(@class, "advgb-slider-arrow") and contains(@style, "border-width: 2px; border-radius: 10%; width: 55px")]');
    }

    public function changeSliderColorsSliderSetting(AcceptanceTester $I) {
        $I->wantTo('Change slider color slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        // click open slider settings
        $I->click('//button[text()="Slider Settings"]');
        //show dots
        $I->click('//label[text()="Show dots"]/preceding-sibling::node()');

        // click open slider colors
        $I->click('//button/span[text()="Slider Colors"]');

        //Arrow and Border Color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Arrow and Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#7b17ff');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial-wrapper"]'); // click block to hide picker

        //Dots Color
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Dots Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#01ad0d');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[@class="advgb-testimonial-wrapper"]'); // click block to hide picker

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');
        $I->seeElement('//button[contains(@class, "advgb-slider-arrow") and contains(@style, "color: rgb(123, 23, 255); border-color: rgb(123, 23, 255)")]');

        $style = $I->executeJS('
                let text = jQuery(".advgb-styles-renderer").text();
                if(text.includes("color:#01ad0d")) {
                    return 1;
                } else {
                    return 0;
                }
        ');
        if($style == 1) {
            $I->dontSee('Error');
        } else {
            $I->see('Error');
        }
    }

    public function changeSliderItems(AcceptanceTester $I) {
        $I->wantTo('Change number of items slider');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        $I->fillField('//label[text()="Number of items"]/following-sibling::node()/following-sibling::node()', 5);

        $I->waitForElement('.slick-track');

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');
        $I->waitForElement('.slick-track');

        // Check columns changed
        $numberItem = $I->executeJS('
            return jQuery(".slick-track").find(".advgb-testimonial-item").length;
        ');

        if($numberItem == 5) {
            $I->dontSee('Error');
        } else {
            $I->see('Error');
        }
    }

    public function changeItemsToShowSlider(AcceptanceTester $I) {
        $I->wantTo('Change items to show slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        $I->fillField('//label[text()="Items to show"]/following-sibling::node()/following-sibling::node()', 2);

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');
        $I->seeElement('//div[@class="slick-track"]/div[contains(@class, "advgb-testimonial-item")][1][contains(@class, "slick-active")]');
        $I->seeElement('//div[@class="slick-track"]/div[contains(@class, "advgb-testimonial-item")][2][contains(@class, "slick-active")]');
    }

    public function changeItemsToScrollSlider(AcceptanceTester $I) {
        $I->wantTo('Change items to scroll slider view');

        $I->clickAndWait('.editor-block-navigation');

        $I->clickAndWait('Testimonial');
        $I->waitForText('Testimonial');

        $I->fillField('//label[text()="Items to scroll"]/following-sibling::node()/following-sibling::node()', 2);

        // Update post
        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-testimonial');

        //check view auto play
        $I->waitForElement('.slick-track');
        $I->waitForElement('.advgb-slider-arrow');
        $I->click('//button[contains(@class, "advgb-slider-next")]');
        $I->wait(1);
        $I->dontSeeElement('//div[@class="slick-track"]/div[contains(@class, "advgb-testimonial-item")][1][contains(@class, "slick-active")]');
        $I->dontSeeElement('//div[@class="slick-track"]/div[contains(@class, "advgb-testimonial-item")][2][contains(@class, "slick-active")]');
        $I->seeElement('//div[@class="slick-track"]/div[contains(@class, "advgb-testimonial-item")][3][contains(@class, "slick-active")]');
        $I->seeElement('//div[@class="slick-track"]/div[contains(@class, "advgb-testimonial-item")][4][contains(@class, "slick-active")]');
    }
}