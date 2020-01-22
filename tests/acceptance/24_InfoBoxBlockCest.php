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
        $I->waitForElement('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close"]');

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

        $containerSection = '//h2/button[text()="Container Settings"]/parent::h2[@class="components-panel__body-title"]/parent::div[contains(@class, "components-panel__body")]';
        //change bg color
        $containerBackground = '#dcd7ca';
        $I->clickAndWait($containerSection . '//span[text()="Background"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($containerBackground);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-infobox-wrapper'); // click block to hide picker
        //change border color
        $containerBorderBackground = '#6d6d6d';
        $I->clickAndWait($containerSection . '//span[text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($containerBorderBackground);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-infobox-wrapper'); // click block to hide picker
        //change Border Width
        $I->fillField($containerSection . '//label[text()="Border Width (px)"]/following-sibling::node()/following-sibling::node()', 3);
        //change Border Radius
        $I->fillField($containerSection . '//label[text()="Border Radius (px)"]/following-sibling::node()/following-sibling::node()', 50);

        $I->updatePost();
        $I->seeElement('//div[contains(@class, "advgb-infobox-wrapper")]');

        $containerBackgroundRgb = 'rgb(220, 215, 202)';
        $frontendContaineRgb = $I->executeJS('return jQuery(".advgb-infobox-wrapper").css("background-color")');
        $I->assertEquals($containerBackgroundRgb, $frontendContaineRgb);

        $containerBorder = '3px solid rgb(109, 109, 109)';
        $frontendContainerBorder = $I->executeJS('return jQuery(".advgb-infobox-wrapper").css("border")');
        $I->assertEquals($containerBorder, $frontendContainerBorder);

        $containerBorderRadius = '50px';
        $frontendContainerBorderRadius = $I->executeJS('return jQuery(".advgb-infobox-wrapper").css("border-radius")');
        $I->assertEquals($containerBorderRadius, $frontendContainerBorderRadius);
    }

    public function changeIconSettings(AcceptanceTester $I) {
        $I->wantTo('Change icon settings');
        $iconSection = '//h2/button[text()="Icon Settings"]/parent::h2[@class="components-panel__body-title"]/parent::div[contains(@class, "components-panel__body")]';
        $I->click('//button[text()="Icon Settings"]');

        //change icon size
        $I->fillField($iconSection . '//label[text()="Icon Size (px)"]/following-sibling::node()/following-sibling::node()', 100);

        //change icon
        $I->click('//button[text()="Icon Selection"]');
        $I->waitForElement('//div[@class="advgb-icon-popup"]');
        $I->click('//div[@class="advgb-icon-popup"]//div[contains(@class, "advgb-icon-items-wrapper")]/div[@class="advgb-icon-item"][1]/span');
        $I->click('//div[@class="advgb-icon-popup"]//button[contains(@class, "apply-btn")]');
        //change icon color
        $iconColor = '#cd2653';
        $I->clickAndWait($iconSection . '//span[text()="Icon Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($iconColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-infobox-wrapper'); // click block to hide picker

        //change background color
        $iconBackground = '#f5f5f5';
        $I->clickAndWait($iconSection . '//span[text()="Background"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($iconBackground);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-infobox-wrapper'); // click block to hide picker
        //change border color
        $iconBorderColor = '#6d6d6d';
        $I->clickAndWait($iconSection . '//span[text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($iconBorderColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-infobox-wrapper'); // click block to hide picker
        //change border width
        $I->fillField($iconSection . '//label[text()="Border Width (px)"]/following-sibling::node()/following-sibling::node()', 2);
        //change border radius
        $I->fillField($iconSection . '//label[text()="Border Radius (px)"]/following-sibling::node()/following-sibling::node()', 10);

        $I->updatePost();
        $I->seeElement('//div[contains(@class, "advgb-infobox-wrapper")]');

        //see changed icon
        $frontendIcon = $I->executeJS('return jQuery(".advgb-infobox-wrapper .material-icons-outlined").text()');
        $I->assertEquals('3d_rotation', $frontendIcon);

        $iconColorRgb = 'rgb(205, 38, 83)';
        $frontendIconColor = $I->executeJS('return jQuery(".advgb-infobox-wrapper .material-icons-outlined").css("color")');
        $I->assertEquals($iconColorRgb, $frontendIconColor);

        $iconSize = '100px';
        $frontendIconSize = $I->executeJS('return jQuery(".advgb-infobox-wrapper .material-icons-outlined").css("font-size")');
        $I->assertEquals($iconSize, $frontendIconSize);

        $iconBgColorRgb = 'rgb(245, 245, 245)';
        $frontendIconBgColor = $I->executeJS('return jQuery(".advgb-infobox-wrapper .advgb-infobox-icon-container").css("background-color")');
        $I->assertEquals($iconBgColorRgb, $frontendIconBgColor);

        $iconBorder = '2px solid rgb(109, 109, 109)';
        $frontendIconBorder = $I->executeJS('return jQuery(".advgb-infobox-wrapper .advgb-infobox-icon-container").css("border")');
        $I->assertEquals($iconBorder, $frontendIconBorder);

        $iconBorderRadius = '10px';
        $frontendIconBorderRadius = $I->executeJS('return jQuery(".advgb-infobox-wrapper .advgb-infobox-icon-container").css("border-radius")');
        $I->assertEquals($iconBorderRadius, $frontendIconBorderRadius);
    }

    public function changeTitleSettings(AcceptanceTester $I) {
        $I->wantTo('Change title settings');
        $titleSection = '//h2/button[text()="Title Settings"]/parent::h2[@class="components-panel__body-title"]/parent::div[contains(@class, "components-panel__body")]';
        $I->click('//button[text()="Title Settings"]');

        //change title
        $I->click('//div[contains(@class, "advgb-infobox-wrapper")]/div[@class="advgb-infobox-wrap"]//h3[contains(@class, "advgb-infobox-title")]');
        $I->selectCurrentElementText();
        $I->pressKeys('Info Box Title');

        //change title color
        $titleColor = '#941d1d';
        $I->clickAndWait($titleSection . '//span[text()="Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($titleColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-infobox-wrapper'); // click block to hide picker
        //change font-size
        $I->fillField($titleSection . '//label[text()="Font Size"]/following-sibling::node()/following-sibling::node()', 50);
        //change line height
        $I->fillField($titleSection . '//label[text()="Line Height"]/following-sibling::node()/following-sibling::node()', 80);
        //change html tag
        $I->selectOption($titleSection . '//label[text()="HTML Tag"]/following-sibling::node()', array('text' => 'H2'));

        $I->updatePost();
        $I->seeElement('//div[contains(@class, "advgb-infobox-wrapper")]');

        $titleColorRgb = 'rgb(148, 29, 29)';
        $frontendTitleColorRgb = $I->executeJS('return jQuery(".advgb-infobox-wrapper .advgb-infobox-title").css("color")');
        $I->assertEquals($titleColorRgb, $frontendTitleColorRgb);

        $titleSize = '50px';
        $frontendTitleSize = $I->executeJS('return jQuery(".advgb-infobox-wrapper .advgb-infobox-title").css("font-size")');
        $I->assertEquals($titleSize, $frontendTitleSize);

        $titleLineHeight = '80px';
        $frontendTitleLineHeight= $I->executeJS('return jQuery(".advgb-infobox-wrapper .advgb-infobox-title").css("line-height")');
        $I->assertEquals($titleLineHeight, $frontendTitleLineHeight);

        $I->seeElement('//h2[@class="advgb-infobox-title"][text()="Info Box Title"]');
    }

    public function changeTextSettings(AcceptanceTester $I) {
        $I->wantTo('Change text settings');
        $textSection = '//h2/button[text()="Text Settings"]/parent::h2[@class="components-panel__body-title"]/parent::div[contains(@class, "components-panel__body")]';
        $I->click('//button[text()="Text Settings"]');

        //change icon color
        $textColor = '#f61616';
        $I->clickAndWait($textSection . '//span[text()="Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys($textColor);
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-infobox-wrapper'); // click block to hide picker
        //change font-size
        $I->fillField($textSection . '//label[text()="Font Size"]/following-sibling::node()/following-sibling::node()', 24);
        //change line height
        $I->fillField($textSection . '//label[text()="Line Height"]/following-sibling::node()/following-sibling::node()', 24);

        $I->updatePost();
        $I->seeElement('//div[contains(@class, "advgb-infobox-wrapper")]');

        $textColorRgb = 'rgb(246, 22, 22)';
        $frontendTextColorRgb = $I->executeJS('return jQuery(".advgb-infobox-wrapper .advgb-infobox-text").css("color")');
        $I->assertEquals($textColorRgb, $frontendTextColorRgb);

        $textSize = '24px';
        $frontendTextSize = $I->executeJS('return jQuery(".advgb-infobox-wrapper .advgb-infobox-text").css("font-size")');
        $I->assertEquals($textSize, $frontendTextSize);

        $textLineHeight = '24px';
        $frontendTextLineHeight= $I->executeJS('return jQuery(".advgb-infobox-wrapper .advgb-infobox-text").css("line-height")');
        $I->assertEquals($textLineHeight, $frontendTextLineHeight);
    }
}