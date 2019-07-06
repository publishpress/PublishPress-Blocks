<?php

class AdvancedButtonBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.wp-block-advgb-button_link');
            $I->clickWithLeftButton('//*[contains(@class, "wp-block-advgb-button_link")]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createButtonBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Adv Button block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Advanced Button Block');

        // Insert block
        $I->insertBlock('Advanced Button');

        $I->waitForElement('//div[contains(@class, "wp-block-advgb-button_link")]');
        $I->pressKeys('Button Text');

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        // Check button rendered
        $I->seeElement('//a[contains(@class, "wp-block-advgb-button_link")][text()="Button Text"]');
    }

    public function changeButtonSizeAndColor(AcceptanceTester $I)
    {
        $I->wantTo('Change button size and color');
        $textColor = '#343434';
        $textColorRgb = 'rgb(52, 52, 52)';
        $bgColor = '#fafafa';
        $bgColorRgb = 'rgb(250, 250, 250)';

        // Change text size
        $I->fillField('//label[text()="Text size"]/following-sibling::node()/following-sibling::node()/following-sibling::node()', 22);

        // Change text color
        $I->click('//span[text()="Color Settings"]');
        $I->clickAndWait('//span[text()="Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($textColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "wp-block-advgb-button_link")]'); // click block to hide picker

        // Change background color
        $I->clickAndWait('//span[text()="Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($bgColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "wp-block-advgb-button_link")]'); // click block to hide picker

        // Update post
        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->clickViewPost();
        $I->waitForElement('.wp-block-advgb-button');

        // Check size applied
        $fontSize = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("fontSize")');
        $I->assertEquals('22px', $fontSize);

        // Check text color applied
        $cTextColor = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("color")');
        $I->assertEquals($textColorRgb, $cTextColor);

        // Check background color applied
        $cBgColor = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("backgroundColor")');
        $I->assertEquals($bgColorRgb, $cBgColor);
    }

    public function changeButtonBorder(AcceptanceTester $I)
    {
        $I->wantTo('Change button border styles');

        // Change border radius
        $I->click('//button[text()="Border"]');
        $I->fillField('//label[text()="Border radius"]/following-sibling::node()/following-sibling::node()', 10);

        // Change border width
        $I->fillField('//label[text()="Border width"]/following-sibling::node()/following-sibling::node()', 2);

        // Change border style
        $I->selectOption('//label[text()="Border style"]/following-sibling::node()', array('text' => 'Dashed'));

        // Change border color
        $I->click('//span[text()="Border Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "wp-block-advgb-button_link")]'); // click block to hide picker

        // Update post
        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->clickViewPost();
        $I->waitForElement('.wp-block-advgb-button');

        // Check border radius applied
        $borderRadius = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("borderRadius")');
        $I->assertEquals('10px', $borderRadius);

        // Check border width applied
        $borderWidth = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("borderWidth")');
        $I->assertEquals('2px', $borderWidth);

        // Check border style applied
        $borderStyle = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("borderStyle")');
        $I->assertEquals('dashed', $borderStyle);

        // Check border style applied
        $borderColor = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("borderColor")');
        $I->assertEquals('rgb(255, 0, 0)', $borderColor);
    }

    public function changeButtonPadding(AcceptanceTester $I)
    {
        $I->wantTo('Change button padding');

        // Change padding
        $I->click('//button[text()="Padding"]');
        $I->see('Padding top');
        $I->fillField('//label[text()="Padding top"]/following-sibling::node()/following-sibling::node()', 3);
        $I->fillField('//label[text()="Padding right"]/following-sibling::node()/following-sibling::node()', 4);
        $I->fillField('//label[text()="Padding bottom"]/following-sibling::node()/following-sibling::node()', 5);
        $I->fillField('//label[text()="Padding left"]/following-sibling::node()/following-sibling::node()', 6);

        // Update post
        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->clickViewPost();
        $I->waitForElement('.wp-block-advgb-button');

        // Check padding applied
        $padding = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("padding")');
        $I->assertEquals('3px 4px 5px 6px', $padding);
    }

    public function changeHoverStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change button hover styles');
        $hoverBgColor = '#ffff00';
        $hoverBgColorRgb = 'rgb(255, 255, 0)';
        $hoverTextColor = '#2196f3';
        $hoverTextColorRgb = 'rgb(33, 150, 243)';
        $hoverShadowColor = '#f9b300';
        $hoverShadowColorRgb = 'rgb(249, 179, 0)';

        // Change hover shadow
        $I->click('//button[text()="Hover"]');
        $I->click('//button[text()="Shadow"]');
        $I->see('Shadow H offset');
        $I->fillField('//label[text()="Shadow H offset"]/following-sibling::node()/following-sibling::node()', 5);
        $I->fillField('//label[text()="Shadow V offset"]/following-sibling::node()/following-sibling::node()', 6);
        $I->fillField('//label[text()="Shadow blur"]/following-sibling::node()/following-sibling::node()', 3);
        $I->fillField('//label[text()="Shadow spread"]/following-sibling::node()/following-sibling::node()', 2);
        $I->fillField('//label[text()="Transition speed"]/following-sibling::node()/following-sibling::node()', 0.5);

        // Change hover color
        $I->click('//h2/button[text()="Hover"]/parent::node()/following-sibling::node()//span[text()="Color Settings"]');
        $I->clickAndWait('//span[text()="Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($hoverBgColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "wp-block-advgb-button_link")]'); // click block to hide picker

        $I->clickAndWait('//span[text()="Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($hoverTextColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "wp-block-advgb-button_link")]'); // click block to hide picker

        $I->clickAndWait('//span[text()="Shadow Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($hoverShadowColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//div[contains(@class, "wp-block-advgb-button_link")]'); // click block to hide picker

        // Update post
        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->clickViewPost();
        $I->waitForElement('.wp-block-advgb-button');

        // Check hover styles applied
        $I->moveMouseOver('.wp-block-advgb-button .wp-block-advgb-button_link');
        $I->wait(1);

        $hBgColor = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("backgroundColor")');
        $I->assertEquals($hoverBgColorRgb, $hBgColor);

        $hTextColor = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("color")');
        $I->assertEquals($hoverTextColorRgb, $hTextColor);

        $boxShadow = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("boxShadow")');
        $I->assertEquals($hoverShadowColorRgb.' 5px 6px 3px 2px', $boxShadow);

        $transition = $I->executeJS('return jQuery(".wp-block-advgb-button_link").css("transition")');
        $I->assertTrue(strpos($transition, '0.5') !== false);
    }
}