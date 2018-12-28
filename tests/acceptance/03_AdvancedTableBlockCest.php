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

        // Click on + button
        $I->click('.edit-post-header-toolbar .editor-inserter button');

        // Search for Recent Posts block
        $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Advanced Table');

        $I->waitForText('Advanced Table');
        $I->click('Advanced Table');

        $I->waitForElement('//*[@class="advgb-init-table"]//label[text()="Column Count"]/following-sibling::node()');
        $I->fillField('//*[@class="advgb-init-table"]//label[text()="Column Count"]/following-sibling::node()', 4);
        $I->fillField('//*[@class="advgb-init-table"]//label[text()="Row Count"]/following-sibling::node()', 4);

        $I->click('Create');

        // Set table content a1 to d4
        foreach([97, 98, 99, 100] as $column) {
            foreach([1, 2, 3, 4] as $row) {
                $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr['.$row.']/td['.($column-96).']');
                $I->pressKeys(chr($column).$row);
            }
        }

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('View Post');

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
        $I->click('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->click('Add Row After');

        // Add a column after
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->click('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->click('Add Column After');

        // Add a row before
        $I->waitForElement('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->click('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->click('Add Row Before');

        // Add a column before
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[2]');
        $I->click('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->click('Add Column Before');

        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->click('View Post');

        $I->seeNumberOfElements('.advgb-table-frontend td', 36);

        $I->see('b3', '//*[contains(@class,"advgb-table-frontend")]//tr[5]/td[3]');
        $I->see('c2', '//*[contains(@class,"advgb-table-frontend")]//tr[3]/td[5]');
    }

    public function setColors(AcceptanceTester $I) {
        $I->wantTo('Set cells color');

        $I->click('Edit Post');

        // Change background color to predefined
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[1]/td[3]');
        $I->click('//span[text()="Background Color"]/following-sibling::node()//div[2]');

        // Change text color to predefined
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[3]');
        $I->click('//span[text()="Text Color"]/following-sibling::node()//div[3]');

        // Change background color to custom
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[1]/td[5]');
        $I->click('//span[text()="Background Color"]/following-sibling::node()//div'); // Todo: remove this line color picket selection as it's buggy in the last version
        $I->click('//span[text()="Background Color"]/following-sibling::node()//div[last()]');
        $I->fillField('.components-color-picker__inputs-wrapper input', '#ff006a');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[1]/td[5]'); // Click back on the cell to hide popup

        // Change text color to custom
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[5]');
        $I->click('//span[text()="Text Color"]/following-sibling::node()//div'); // Todo: remove this line color picket selection as it's buggy in the last version
        $I->click('//span[text()="Text Color"]/following-sibling::node()//div[last()]');
        $I->fillField('.components-color-picker__inputs-wrapper input', '#335e77');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[5]'); // Click back on the cell to hide popup


        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->click('View Post');

        $I->seeElement('//table[contains(@class,"advgb-table-frontend")]//tr[1]//td[3 and contains(@style, "background-color:#cf2e2e")]');
        $I->seeElement('//table[contains(@class,"advgb-table-frontend")]//tr[3]//td[3 and contains(@style, "color:#ff6900")]');
        $I->seeElement('//table[contains(@class,"advgb-table-frontend")]//tr[1]//td[5 and contains(@style, "background-color:#ff006a")]');
        $I->seeElement('//table[contains(@class,"advgb-table-frontend")]//tr[3]//td[5 and contains(@style, "color:#335e77")]');
    }

    public function removeCells(AcceptanceTester $I)
    {
        $I->wantTo('Remove cells');

        $I->click('Edit Post');

        // Remove a row
        $I->waitForElement('//*[@class="wp-block-advgb-table"]//tr[2]/td[6]');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[6]');
        $I->click('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->click('Delete Row');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[3]');
        $I->click('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->click('Delete Row');

        // Remove a columns
        $I->waitForElement('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        $I->click('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->click('Delete Column');
        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[3]/td[3]');
        $I->click('//div[contains(@class, "wp-block")][@data-type="advgb/table"]//button[@aria-label="Edit Table"]');
        $I->click('Delete Column');

        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->click('View Post');

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

        $I->click('View Post');

        // Check the actual width
        $width = $I->getElementWidth('//*[contains(@class,"advgb-table-frontend")]');
        $I->assertEquals(200, $width);
    }

}
