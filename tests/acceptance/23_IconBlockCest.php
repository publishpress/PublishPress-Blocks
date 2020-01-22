<?php


class IconBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-icon-wrapper');
            $I->clickWithLeftButton('//div[@class="advgb-icon-wrapper"]');
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

        $I->wantTo('Create a Icon block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->waitForElementVisible('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close"]');

        $I->fillField('.editor-post-title__input', 'Advanced Icon');

        // Insert block
        $I->insertBlock('Advanced Icon');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        $I->seeElement('//div[contains(@class, "wp-block-advgb-icon")]/div[@class="advgb-icons"]//div[contains(@class, "advgb-icon-wrap")]');

    }

    public function changeNumberOfIcon(AcceptanceTester $I) {
        $I->wantTo('Change number of icon');

        $I->fillField('//label[text()="Number of Icons"]/following-sibling::node()/following-sibling::node()', 3);

        $I->updatePost();
        $I->waitForElement('//div[contains(@class, "wp-block-advgb-icon")]');

        $I->seeNumberOfElements('//div[contains(@class, "wp-block-advgb-icon")]/div[@class="advgb-icons"]//div[contains(@class, "advgb-icon-wrap")]', 3);
    }

    public function changeSettingsIcon1(AcceptanceTester $I) {
        $I->wantTo('Change settings of icon 1');

        $I->click('//button[text()="Icon 1 Settings"]');

        $I->click('//button[text()="Icon Selection"]');
        $I->waitForElement('//div[@class="advgb-icon-popup"]');
        $I->click('//div[@class="advgb-icon-popup"]//div[contains(@class, "advgb-icon-items-wrapper")]/div[@class="advgb-icon-item"][1]/span');
        $I->click('//div[@class="advgb-icon-popup"]//button[contains(@class, "apply-btn")]');

        //change style
        $I->selectOption('//label[text()="Icon Style"]/following-sibling::node()', array('text' => 'Stacked'));

        //change icon size
        $I->fillField('//label[text()="Icon Size"]/following-sibling::node()/following-sibling::node()', 60);

        //change icon color
        $iconColor = '#ff9900';
        $I->clickAndWait('//span[text()="Icon Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($iconColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-icon-wrapper'); // click block to hide picker

        //change icon background color
        $iconBgColor = '#f5f5f5';
        $I->clickAndWait('//span[text()="Icon Background"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($iconBgColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-icon-wrapper'); // click block to hide picker

        //change border color
        $borderColor = '#ff9900';
        $I->clickAndWait('//span[text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($borderColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-icon-wrapper'); // click block to hide picker

        //change border radius
        $I->fillField('//label[text()="Border Radius(%)"]/following-sibling::node()/following-sibling::node()', 30);

        //change border size
        $I->fillField('//label[text()="Border Size(px)"]/following-sibling::node()/following-sibling::node()', 4);

        //change link URL
        $I->fillField('//span[text()="Link"]/following-sibling::node()//input[@aria-label="URL"]', '#');

        //change link target
        $I->selectOption('//label[text()="Link Target"]/following-sibling::node()', array('text' => 'New Window'));

        //change link title
        $I->fillField('//label[text()="Title for Accessibility"]/following-sibling::node()', 'Icon 1');

        $I->updatePost();

        $I->waitForElement('//div[contains(@class, "wp-block-advgb-icon")]');

        //see changed icon
        $frontendIcon = $I->executeJS('return jQuery(".advgb-item-0 .material-icons-outlined").text()');
        $I->assertEquals('3d_rotation', $frontendIcon);

        $iconSize = '60px';
        $frontendIconSize = $I->executeJS('return jQuery(".advgb-item-0 .material-icons-outlined").css("font-size")');
        $I->assertEquals($iconSize, $frontendIconSize);
        //color
        $iconColorRbg = 'rgb(255, 153, 0)';
        $frontendIconColor = $I->executeJS('return jQuery(".advgb-item-0 .material-icons-outlined").css("color")');
        $I->assertEquals($iconColorRbg, $frontendIconColor);
        //icon background color
        $iconBgColorRbg = 'rgb(245, 245, 245)';
        $frontendIconBgColorRbg = $I->executeJS('return jQuery(".advgb-item-0 .advgb-icon").css("background-color")');
        $I->assertEquals($iconBgColorRbg, $frontendIconBgColorRbg);
        //icon border
        $border = '4px solid rgb(255, 153, 0)';
        $frontendBorder = $I->executeJS('return jQuery(".advgb-item-0 .advgb-icon").css("border")');
        $I->assertEquals($border, $frontendBorder);
        //border radius
        $borderRadius = '30%';
        $frontendBorderRadius = $I->executeJS('return jQuery(".advgb-item-0 .advgb-icon").css("border-radius")');
        $I->assertEquals($borderRadius, $frontendBorderRadius);

        //link
        $I->seeElement('//div[contains(@class, "wp-block-advgb-icon")]/div[@class="advgb-icons"]//a');
        //link href
        $I->seeElement('//div[contains(@class, "wp-block-advgb-icon")]/div[@class="advgb-icons"]//a[@href="#"]');
        //link target
        //$I->seeElement('//div[contains(@class, "wp-block-advgb-icon")]/div[@class="advgb-icons"]//a[@target="_blank"]');
        //link title
        $I->seeElement('//div[contains(@class, "wp-block-advgb-icon")]/div[@class="advgb-icons"]//a[@title="Icon 1"]');

        //margin
        $margin = '0px 40px 0px 0px';
        $frontendMargin = $I->executeJS('return jQuery(".advgb-item-0 .advgb-icon").css("margin")');
        $I->assertEquals($margin, $frontendMargin);
        //padding
        $padding = '20px';
        $frontendPadding = $I->executeJS('return jQuery(".advgb-item-0 .advgb-icon").css("padding")');
        $I->assertEquals($padding, $frontendPadding);
    }
}