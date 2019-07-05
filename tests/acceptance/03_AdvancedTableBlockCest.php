<?php


//todo: border tests
//todo: alignment tests
//todo: split cells tests
//todo: merge cells tests

class AdvancedTableBlockCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createAdvancedTableBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create an advanced table block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Advanced Table Block');

        // Insert block
        $I->insertBlock('Advanced Table');

        $I->waitForElement('//*[@class="advgb-init-table"]//label[text()="Column Count"]/following-sibling::node()');
        $I->fillField('//*[@class="advgb-init-table"]//label[text()="Column Count"]/following-sibling::node()', 4);
        $I->fillField('//*[@class="advgb-init-table"]//label[text()="Row Count"]/following-sibling::node()', 4);

        $I->click('Create');

        // Set table content a1 to d4
        foreach([97, 98, 99, 100] as $column) {
            foreach([1, 2, 3, 4] as $row) {
                $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr['.$row.']/td['.($column-96).']');
                $I->wait(0.5);
                $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr['.$row.']/td['.($column-96).']');
                $I->pressKeys(chr($column).$row);
                $I->wait(0.5);
            }
        }

        $I->wait(2);
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->clickViewPost();

        $I->seeElement('.wp-block-advgb-table.advgb-table-frontend');
        $I->seeNumberOfElements('.advgb-table-frontend td', 16);
    }

    public function addCells(AcceptanceTester $I)
    {
        $I->wantTo('Add cells');

        $I->click('Edit Post');

        // Add a row after
        $I->waitForElement('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->clickAndWait('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->clickAndWait('Add Row After');

        // Add a column after
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->clickAndWait('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->clickAndWait('Add Column After');

        // Add a row before
        $I->waitForElement('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->clickAndWait('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->clickAndWait('Add Row Before');

        // Add a column before
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[2]');
        $I->clickAndWait('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->clickAndWait('Add Column Before');

        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->clickViewPost();

        $I->waitForElement('.advgb-table-frontend');

        $I->seeNumberOfElements('.advgb-table-frontend td', 36);

        $I->see('b3', '//*[contains(@class,"advgb-table-frontend")]//tr[5]/td[3]');
        $I->see('c2', '//*[contains(@class,"advgb-table-frontend")]//tr[3]/td[5]');
    }

    public function setColors(AcceptanceTester $I) {
        $I->wantTo('Set cells color');

        $colors = [];

        $I->click('Edit Post');

        // Change background color to predefined
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[1]/td[3]');
        $I->click('//span[text()="Background Color"]/following-sibling::node()//div[2]');
        // Grab color from predefined picker
        $string = $I->grabAttributeFrom('//span[text()="Background Color"]/following-sibling::node()//div[2]/button', 'style');
        $re = '/color:\s*rgb\(([0-9]{1,3}),\s*([0-9]{1,3}),\s*([0-9]{1,3})\);/';
        $matches = null;
        preg_match($re, $string, $matches);
        $colors[0] = '';
        for ($ij=1; $ij<=3; $ij++) {$colors[0] .= str_pad(dechex($matches[$ij]), 2, '0', STR_PAD_LEFT);}
        $colors[0]='#'.(($colors[0][0]===$colors[0][1] && $colors[0][2]===$colors[0][3] && $colors[0][4]===$colors[0][5])?$colors[0][0].$colors[0][2].$colors[0][4]:$colors[0]);

        // Change text color to predefined
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[3]');
        $I->click('//span[text()="Text Color"]/following-sibling::node()//div[3]');
        // Grab color from predefined picker
        $string = $I->grabAttributeFrom('//span[text()="Text Color"]/following-sibling::node()//div[3]/button', 'style');
        $re = '/color:\s*rgb\(([0-9]{1,3}),\s*([0-9]{1,3}),\s*([0-9]{1,3})\);/';
        $matches = null;
        preg_match($re, $string, $matches);
        $colors[1] = '';
        for ($ij=1; $ij<=3; $ij++) {$colors[1] .= str_pad(dechex($matches[$ij]), 2, '0', STR_PAD_LEFT);}
        $colors[1]='#'.(($colors[1][0]===$colors[1][1] && $colors[1][2]===$colors[1][3] && $colors[1][4]===$colors[1][5])?$colors[1][0].$colors[1][2].$colors[1][4]:$colors[1]);

        // Change background color to custom
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[1]/td[5]');
        $I->clickAndWait('//span[text()="Background Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff006a');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[1]/td[5]'); // Click back on the cell to hide popup
        $colors[2] = '#ff006a';

        $I->wait(0.5);

        // Change text color to custom
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[5]');
        $I->clickAndWait('//span[text()="Text Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#335e77');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[5]'); // Click back on the cell to hide popup
        $colors[3] = '#335e77';

        $I->wait(0.5);

        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->clickViewPost();

        $I->waitForElementVisible('.advgb-table-frontend', 5);
        $I->seeElement('//table[contains(@class,"advgb-table-frontend")]//tr[1]//td[3 and contains(@style, "background-color:'.$colors[0].'")]');
        $I->seeElement('//table[contains(@class,"advgb-table-frontend")]//tr[3]//td[3 and contains(@style, "color:'.$colors[1].'")]');
        $I->seeElement('//table[contains(@class,"advgb-table-frontend")]//tr[1]//td[5 and contains(@style, "background-color:'.$colors[2].'")]');
        $I->seeElement('//table[contains(@class,"advgb-table-frontend")]//tr[3]//td[5 and contains(@style, "color:'.$colors[3].'")]');
    }

    public function removeCells(AcceptanceTester $I)
    {
        $I->wantTo('Remove cells');

        $I->click('Edit Post');

        $I->wait(0.1);

        // Remove a row
        $I->waitForElement('//*[@class="wp-block-advgb-table"]//tr[2]/td[6]');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[6]');
        $I->clickAndWait('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->clickAndWait('Delete Row');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[3]');
        $I->clickAndWait('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->clickAndWait('Delete Row');

        // Remove a columns
        $I->waitForElement('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->clickAndWait('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->clickAndWait('Delete Column');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[3]');
        $I->clickAndWait('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->clickAndWait('Delete Column');

        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->clickViewPost();

        $I->seeNumberOfElements('.advgb-table-frontend td', 16);

        $I->see('b3', '//*[contains(@class,"advgb-table-frontend")]//tr[3]/td[2]');
        $I->see('c2', '//*[contains(@class,"advgb-table-frontend")]//tr[2]/td[3]');
    }

    public function setTableWidth(AcceptanceTester $I)
    {
        $I->wantTo('Set table width');

        $I->click('Edit Post');

        // Select the table
        $I->waitForElement('//*[@class="wp-block-advgb-table"]//tr[1]/td[1]');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[1]/td[1]');

        $I->waitForElementVisible('//label[text()="Max width (px)"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Max width (px)"]/following-sibling::node()/following-sibling::node()', 200);

        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->clickViewPost();

        // Check the actual width
        $width = $I->getElementWidth('//*[contains(@class,"advgb-table-frontend")]');
        $I->assertEquals(200, $width);
    }

}
