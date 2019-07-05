<?php

/**
 * @group init_settings
 */
class prepareSettingsCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function prepareSettings(AcceptanceTester $I)
    {
        $I->wantTo('Prepare settings for plugins');
        // Login
        $I->loginAsAdmin('admin', 'password');

        // Save Google map API Key
        $I->amOnPage('/wp-admin/admin.php?page=advgb_main#settings');

        $map_api_key = $I->getParam('map-api-key');
        $current_map_api_key = $I->grabValueFrom('//input[@id="google_api_key"]');

        if ($current_map_api_key !== $map_api_key) {
            $I->fillField('//input[@id="google_api_key"]', $map_api_key);
            $I->click('Save');

            $I->waitForText('Settings saved successfully');
        }
    }
}