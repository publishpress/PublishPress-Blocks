<?php

class ColumnsBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-columns-wrapper');
            //$I->clickWithLeftButton('//div[contains(@aria-label, "Block: Columns Manager")]', -3, 0);
            $I->clickWithLeftButton('.advgb-columns-spacing');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createColumnsBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Columns Manager block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->waitForElement('.edit-post-welcome-guide');
        $I->clickWithLeftButton('//button[@aria-label="Close"]');

        $I->fillField('.editor-post-title__input', 'Columns Manager Block');

        // Insert block
        $I->insertBlock('Columns Manager');

        // Choose layout 3 columns
        $I->waitForText('Pickup a columns layout');
        $I->click('//div[contains(@class, "advgb-columns-select-layout")]/div[contains(@class, "advgb-columns-layout")][9]');

        // Insert content to column 1
        try {
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:first-child .block-list-appender');
            $I->waitForElement('.editor-inserter__search');
            $I->wait(0.2); // wait for animation done
            // Insert paragraph block
            $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Paragraph');
            $I->waitForText('Paragraph');
            $I->click('Paragraph');
        } catch (Exception $e) {
            // not latest gutenberg
        }

        $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:first-child .advgb-column .wp-block-paragraph');
        $I->selectCurrentElementText();
        $I->pressKeys("First column text");

        // Insert content to column 2
        try {
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:nth-child(2)');
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:nth-child(2) .block-list-appender');
            $I->waitForElement('.editor-inserter__search');
            $I->wait(0.2); // wait for animation done
            // Insert paragraph block
            $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Paragraph');
            $I->waitForText('Paragraph');
            $I->click('Paragraph');
        } catch (Exception $e) {
            // not latest gutenberg
        }

        $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:nth-child(2) .advgb-column .wp-block-paragraph');
        $I->selectCurrentElementText();
        $I->pressKeys("Second column text");

        // Insert content to column 3
        try {
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:last-child');
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:last-child .block-list-appender');
            $I->waitForElement('.editor-inserter__search');
            $I->wait(0.2); // wait for animation done
            // Insert paragraph block
            $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Paragraph');
            $I->waitForText('Paragraph');
            $I->click('Paragraph');
        } catch (Exception $e) {
            // not latest gutenberg
        }

        $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:last-child .advgb-column .wp-block-paragraph');
        $I->selectCurrentElementText();
        $I->pressKeys("Third column text");
        $I->wait(1);

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-columns');

        // Check
        $I->seeElement('div.advgb-columns.layout-13-13-13.mbl-layout-stacked');
        $I->seeNumberOfElements('div.advgb-columns.layout-13-13-13.mbl-layout-stacked > div', 3);
    }

    public function changeColumnsLayout(AcceptanceTester $I)
    {
        $I->wantTo('Change columns layout styles');

        // Change
        $I->click('//div[@class="advgb-columns-select-layout on-inspector"]/div[contains(@class, "advgb-columns-layout")][4]');
        $I->selectOption('//label[text()="Space between columns"]/following-sibling::node()', array('text' => '30px'));

        $I->click('//div[contains(@class, "advgb-columns-responsive-item")][text()="tablet"]');
        $I->click('//div[@class="advgb-columns-select-layout on-inspector"]/div[contains(@class, "advgb-columns-layout")][9]');

        $I->click('//div[contains(@class, "advgb-columns-responsive-item")][text()="mobile"]');
        $I->selectOption('//label[text()="Vertical space when collapsed"]/following-sibling::node()', array('text' => '20px'));
        $I->click('//label[text()="Collapsed Order RTL"]/preceding-sibling::node()');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-columns');

        // Check
        $I->seeElement('div.advgb-columns.layout-14-12-14.tbl-layout-1-12-12.mbl-layout-stacked.gutter-30.vgutter-20.order-rtl');
        $I->seeElement('div.advgb-columns > div.advgb-column:first-child.advgb-is-one-quarter-desktop.advgb-is-full-tablet.advgb-is-full-mobile');
        $I->seeElement('div.advgb-columns > div.advgb-column:nth-child(2).advgb-is-half-desktop.advgb-is-half-tablet.advgb-is-full-mobile');
        $I->seeElement('div.advgb-columns > div.advgb-column:nth-child(3).advgb-is-one-quarter-desktop.advgb-is-half-tablet.advgb-is-full-mobile');
    }

    public function changeColumnsSettings(AcceptanceTester $I)
    {
        $I->wantTo('Change columns settings');

        // Change
        $I->click('//button[text()="Row Settings"]');
        $I->selectOption('//label[text()="Wrapper Tag"]/following-sibling::node()', array('text' => 'Section'));
        $I->fillField('//label[text()="Content Max Width"]/following-sibling::node()/following-sibling::node()', 90);
        $I->click('//label[text()="Content Max Width"]/div[@class="advgb-unit-wrapper"]/span[text()="%"]');
        $I->fillField('//label[text()="Content Min Height"]/following-sibling::node()/following-sibling::node()', 20);
        $I->click('//label[text()="Content Min Height"]/div[@class="advgb-unit-wrapper"]/span[text()="vh"]');
        $I->fillField('//label[text()="Content Max Height"]/following-sibling::node()/following-sibling::node()', 20);
        $I->click('//label[text()="Content Max Height"]/div[@class="advgb-unit-wrapper"]/span[text()="vh"]');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-columns');

        // Check
        $I->seeElement('section.advgb-columns-wrapper');
        $I->seeElement('//div[contains(@class, "advgb-columns")][contains(@style, "max-width:90%")]');
        $I->seeElement('//div[contains(@class, "advgb-columns")][contains(@style, "min-height:20vh")]');
        $I->seeElement('//div[contains(@class, "advgb-columns")][contains(@style, "max-height:20vh")]');
    }

    public function changeInnerColumnStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change inner columns styles');

        // Change column 1
        $I->clickWithLeftButton('//div[contains(@aria-label, "Block: Adv. Column")][1]/div[contains(@class, "editor-block-list__block-edit")]', 0, 1);

        $I->selectOption('//label[text()="Border style"]/following-sibling::node()', array('text' => 'Solid'));
        $I->waitForText('Border width');
        $I->fillField('//label[text()="Border width"]/following-sibling::node()/following-sibling::node()', 2);
        $I->fillField('//label[text()="Border radius (px)"]/following-sibling::node()/following-sibling::node()', 4);
        $I->click('//span[text()="Desktop text alignment"]/following-sibling::node()/div[1]/button');

        $I->click('//button/span[text()="Border Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff6900');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-columns-wrapper'); // click block to hide picker

        // Change column 2
        $I->clickWithLeftButton('//div[contains(@aria-label, "Block: Adv. Column")][2]/div[contains(@class, "editor-block-list__block-edit")]', 0, 1);

        $I->selectOption('//label[text()="Border style"]/following-sibling::node()', array('text' => 'Dotted'));
        $I->waitForText('Border width');
        $I->fillField('//label[text()="Border width"]/following-sibling::node()/following-sibling::node()', 3);
        $I->fillField('//label[text()="Border radius (px)"]/following-sibling::node()/following-sibling::node()', 8);
        $I->click('//span[text()="Desktop text alignment"]/following-sibling::node()/div[2]/button');

        $I->click('//button/span[text()="Border Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#00d084');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-columns-wrapper'); // click block to hide picker

        // Change column 3
        $I->clickWithLeftButton('//div[contains(@aria-label, "Block: Adv. Column")][3]/div[contains(@class, "editor-block-list__block-edit")]', 0, 1);

        $I->selectOption('//label[text()="Border style"]/following-sibling::node()', array('text' => 'Dashed'));
        $I->waitForText('Border width');
        $I->fillField('//label[text()="Border width"]/following-sibling::node()/following-sibling::node()', 4);
        $I->fillField('//label[text()="Border radius (px)"]/following-sibling::node()/following-sibling::node()', 10);
        $I->click('//span[text()="Desktop text alignment"]/following-sibling::node()/div[3]/button');

        $I->click('//button/span[text()="Border Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Border Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#2196f3');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-columns-wrapper'); // click block to hide picker

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-columns');

        // Check
        $selectorCol1 = '//div[contains(@class, "advgb-columns")]/div[contains(@class, "advgb-column")][1]/div[@class="advgb-column-inner"]';
        $selectorCol2 = '//div[contains(@class, "advgb-columns")]/div[contains(@class, "advgb-column")][2]/div[@class="advgb-column-inner"]';
        $selectorCol3 = '//div[contains(@class, "advgb-columns")]/div[contains(@class, "advgb-column")][3]/div[@class="advgb-column-inner"]';

        $I->seeElement($selectorCol1.'[contains(@style, "border-style:solid")]');
        $I->seeElement($selectorCol1.'[contains(@style, "border-color:#ff6900")]');
        $I->seeElement($selectorCol1.'[contains(@style, "border-width:2px")]');
        $I->seeElement($selectorCol1.'[contains(@style, "border-radius:4px")]');

        $I->seeElement($selectorCol2.'[contains(@style, "border-style:dotted")]');
        $I->seeElement($selectorCol2.'[contains(@style, "border-color:#00d084")]');
        $I->seeElement($selectorCol2.'[contains(@style, "border-width:3px")]');
        $I->seeElement($selectorCol2.'[contains(@style, "border-radius:8px")]');

        $I->seeElement($selectorCol3.'[contains(@style, "border-style:dashed")]');
        $I->seeElement($selectorCol3.'[contains(@style, "border-color:#2196f3")]');
        $I->seeElement($selectorCol3.'[contains(@style, "border-width:4px")]');
        $I->seeElement($selectorCol3.'[contains(@style, "border-radius:10px")]');

        $textAlign1 = $I->executeJS('return jQuery(".advgb-columns .advgb-column:nth-child(1) .advgb-column-inner").css("text-align")');
        $I->assertEquals('left', $textAlign1);

        $textAlign2 = $I->executeJS('return jQuery(".advgb-columns .advgb-column:nth-child(2) .advgb-column-inner").css("text-align")');
        $I->assertEquals('center', $textAlign2);

        $textAlign3 = $I->executeJS('return jQuery(".advgb-columns .advgb-column:nth-child(3) .advgb-column-inner").css("text-align")');
        $I->assertEquals('right', $textAlign3);
    }

    public function changeInnerColumnsWidth(AcceptanceTester $I)
    {
        $I->wantTo('Change inner columns width');

        // Change column 1
        $I->clickWithLeftButton('//div[contains(@aria-label, "Block: Adv. Column")][1]/div[contains(@class, "editor-block-list__block-edit")]', 0, 1);

        $I->fillField('//label[text()="Width (%)"]/following-sibling::node()/following-sibling::node()', 30);

        // Change column 2
        $I->clickWithLeftButton('//div[contains(@aria-label, "Block: Adv. Column")][2]/div[contains(@class, "editor-block-list__block-edit")]', 0, 1);

        $I->see('Available: 70%');
        $I->fillField('//label[text()="Width (%)"]/following-sibling::node()/following-sibling::node()', 50);

        // Change column 2
        $I->clickWithLeftButton('//div[contains(@aria-label, "Block: Adv. Column")][3]/div[contains(@class, "editor-block-list__block-edit")]', 0, 1);

        $I->see('Available: 20%');
        $I->fillField('//label[text()="Width (%)"]/following-sibling::node()/following-sibling::node()', 20);

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-columns');

        // Check
        $selectorCol1 = '//div[contains(@class, "advgb-columns")]/div[contains(@class, "advgb-column")][1]';
        $selectorCol2 = '//div[contains(@class, "advgb-columns")]/div[contains(@class, "advgb-column")][2]';
        $selectorCol3 = '//div[contains(@class, "advgb-columns")]/div[contains(@class, "advgb-column")][3]';

        $I->seeElement($selectorCol1.'[contains(@style, "width:30%")]');
        $I->seeElement($selectorCol2.'[contains(@style, "width:50%")]');
        $I->seeElement($selectorCol3.'[contains(@style, "width:20%")]');
    }

    public function changeColumnsWrap(AcceptanceTester $I)
    {
        $I->wantTo('Change columns settings');

        // Change
        $I->click('//button[text()="Row Settings"]');
        $I->click('//label[text()="Columns Wrapped"]/preceding-sibling::node()');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-columns');

        // Check
        $I->seeElement('section.advgb-columns-wrapper');
        $I->seeElement('//div[contains(@class, "advgb-columns")][contains(@class, "columns-wrapped")]');
    }
}