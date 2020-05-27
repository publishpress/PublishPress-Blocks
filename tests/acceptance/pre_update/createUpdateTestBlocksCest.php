<?php

/**
 * @group pre_update
 */
class createUpdateTestBlocksCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function prepareNewPost(AcceptanceTester $I)
    {
        // Login
        $I->loginAsAdmin('admin', 'password');

        // Save Google map API Key
        $map_api_key = $I->getParam('map-api-key');
        $I->amOnPage('/wp-admin/admin.php?page=advgb_main#settings');
        $I->fillField('//input[@id="google_api_key"]', $map_api_key);
        $I->click('Save');

        // Create new post
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

        // Change post title
        $I->waitForElement('.editor-post-title__input');
        $I->fillField('.editor-post-title__input', 'Update test');
    }

    public function createRecentPostsBlock(AcceptanceTester $I)
    {
        /***** Add Recent Posts Block *****/
        $I->insertBlock('Recent Posts');

        // Change category to Recent Posts
        $I->waitForElement('//label[text()="Category"]/following-sibling::node()/option[text()="Recent posts"]');
        $I->selectOption('//label[text()="Category"]/following-sibling::node()', array('text' => 'Recent posts'));

        $I->waitForElement('//label[text()="Number of items"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Number of items"]/following-sibling::node()/following-sibling::node()', 5);
    }

    public function createTableBlock(AcceptanceTester $I)
    {
        /***** Add Advanced table *****/
        $I->insertBlock('Advanced Table');

        $I->waitForElement('//*[@class="advgb-init-table"]//label[text()="Column Count"]/following-sibling::node()');
        $I->fillField('//*[@class="advgb-init-table"]//label[text()="Column Count"]/following-sibling::node()', 4);
        $I->fillField('//*[@class="advgb-init-table"]//label[text()="Row Count"]/following-sibling::node()', 4);

        $I->click('Create');

        $I->waitForElement('//label[text()="Max width (px)"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Max width (px)"]/following-sibling::node()/following-sibling::node()', 800);

        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[1]/td[2]');
        $I->pressKeys('Hello'.WebDriverKeys::ENTER);
        // Change color to blue
        try {
            $I->click('//span[text()="Text Color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[2]');
        } catch (Exception $e) {}

        try {
            $I->click('//span[text()="Text Color"]/following-sibling::node()//div[2]');
        } catch (Exception $e) {}

        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[4]/td[4]');
        $I->pressKeys('World');

        // Change color
        try {
            $I->click('//span[text()="Background Color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[2]');
        } catch (Exception $e) {}

        try {
            $I->click('/span[text()="Background Color"]/following-sibling::node()//div[2]');
        } catch (Exception $e) {}

        $I->clickWithLeftButton('//*[@class="wp-block-advgb-table"]//tr[2]/td[2]');
        // Change border to 3px
        $I->click('//button[text()="Border"]');
        $I->fillField('//label[text()="Border width"]/following-sibling::node()/following-sibling::node()', 3);
        // Change border color to blue
        try {
            $I->click('//span[text()="Border Color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[3]');
        } catch (Exception $e) {}

        try {
            $I->click('//span[text()="Border Color"]/following-sibling::node()//div[3]');
        } catch (Exception $e) {}

        // Set only right border
        $I->click('//div[@class="advgb-border-item-wrapper"]/div[last()]');
        $I->click('//div[@class="advgb-border-item-wrapper"]/div[2]');
    }

    public function createAdvImageBlock(AcceptanceTester $I)
    {
        /***** Add Advanced Image *****/
        $I->insertBlock('Advanced Image');

        $I->waitForElement('//button[text()="Open media library"]');
        $I->click('//div[contains(@class, "advgb-image-block")]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Hello world');
        $I->click('//div[contains(@class, "advgb-image-block")]//p[contains(@class, "advgb-image-subtitle")]');
        $I->selectCurrentElementText();
        $I->pressKeys('Lorem ipsum');

        $I->click('//button[text()="Open media library"]');
        $I->waitForText('Media Library');
        $I->click('Media Library');
        $I->waitForElement('//div[@class="attachments-browser"]//ul/li[@aria-label="The Bubble Nebula"]');
        $I->click('//div[@class="attachments-browser"]//ul/li[@aria-label="The Bubble Nebula"]');
        $I->click('Select');
    }

    public function createMapBlock(AcceptanceTester $I)
    {
        /***** Add map *****/
        $I->insertBlock('Map');
        // todo: modify some content here
    }

    public function createAdvButtonBlock(AcceptanceTester $I)
    {
        /***** Add advanced button *****/
        $I->insertBlock('Advanced Button');

        $I->waitForElement('//span[contains(@class, "wp-block-advgb-button_link")]');
        $I->pressKeys('My button');
    }

    public function createTestimonialBlock(AcceptanceTester $I)
    {
        /***** Add Testimonial *****/
        $I->insertBlock('Testimonial');

        $I->waitForElement('//label[text()="Columns"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Columns"]/following-sibling::node()/following-sibling::node()', 2);

        // Select first person image
        $I->waitForElement('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][1]//div[@class="advgb-testimonial-avatar"]');
        $I->click('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][1]//div[@class="advgb-testimonial-avatar"]');
        $I->waitForElement('//div[@class="attachments-browser"]//ul/li[@aria-label="man"]');
        $I->click('//div[@class="attachments-browser"]//ul/li[@aria-label="man"]');
        $I->click('Select');

        // change first person name
        $I->click('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][1]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('John Doe');

        $I->click('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][1]//p[contains(@class, "advgb-testimonial-position")]');
        $I->selectCurrentElementText();
        $I->pressKeys('Chief Technical Officer');

        $I->click('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][1]//p[contains(@class, "advgb-testimonial-desc")]');
        $I->selectCurrentElementText();
        $I->pressKeys('Ignea librata. Sublime faecis altae ignea ponderibus verba ulla.');

        // Second person
        $I->waitForElement('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][2]//div[@class="advgb-testimonial-avatar"]');
        $I->click('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][2]//div[@class="advgb-testimonial-avatar"]');
        $I->waitForElement('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="woman"]');
        $I->click('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="woman"]');
        $I->click('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//button[contains(@class, "media-button-select")]');

        $I->click('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][2]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Jane Doe');

        $I->click('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][2]//p[contains(@class, "advgb-testimonial-position")]');
        $I->selectCurrentElementText();
        $I->pressKeys('Chief Executive Officer');

        $I->click('//div[contains(@class, "advgb-testimonial")]//div[@class="advgb-testimonial-item"][2]//p[contains(@class, "advgb-testimonial-desc")]');
        $I->selectCurrentElementText();
        $I->pressKeys('Orbe lanient quoque evolvit manebat. Figuras possedit siccis. Ut animalibus ventos terris deorum eurus.');
    }

    public function createImagesSliderBlock(AcceptanceTester $I)
    {
        /***** Add Image slider *****/
        $I->insertBlock('Images Slider');

        $I->waitForText('Add images');
        $I->click('Add images');

        $I->waitForElement('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="vineyard"]');
        $I->click('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="vineyard"]');
        $I->clickAndWait('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//button[contains(@class, "media-button-select")]');
        $I->fillField('//div[@class="advgb-image-slider-control"]//input', 'Vineyard');
        $I->fillField('//div[@class="advgb-image-slider-control"][2]//textarea', 'Effervescere proxima habitandae nullo titan.');

        $I->click('//div[@class="advgb-image-slider-add-item"]//button');
        $I->waitForElement('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="road"]');
        $I->click('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="road"]');
        $I->clickAndWait('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//button[contains(@class, "media-button-select")]');
        $I->clickAndWait('//div[contains(@class, "advgb-image-slider-image-list-item")][2]');
        $I->fillField('//div[@class="advgb-image-slider-control"]//input', 'Road');
        $I->fillField('//div[@class="advgb-image-slider-control"][2]//textarea', 'Utramque locoque summaque congestaque.');

        $I->click('//div[@class="advgb-image-slider-add-item"]//button');
        $I->waitForElement('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="field"]');
        $I->click('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//div[@class="attachments-browser"]//ul/li[@aria-label="field"]');
        $I->clickAndWait('//body/div[contains(@id, "__wp-uploader-id-") and not(contains(@style, "display: none;"))]//button[contains(@class, "media-button-select")]');
        $I->clickAndWait('//div[contains(@class, "advgb-image-slider-image-list-item")][3]');
        $I->fillField('//div[@class="advgb-image-slider-control"]//input', 'Field');
        $I->fillField('//div[@class="advgb-image-slider-control"][2]//textarea', 'Pectent caecoque semine regio.');
        $I->wait(0.1);
    }

    public function createSocialLinksBlock(AcceptanceTester $I)
    {
        /***** Add Social Links *****/
        $I->insertBlock('Social Links');

        $I->waitForElement('//div[@class="advgb-social-link"]//input');
        $I->fillField('//div[@class="advgb-social-link"]//input', 'http://twitter.com/advgutenberg');
        $I->click('//div[@class="advgb-icon-items-wrapper"]//div[@class="advgb-icon-item"][4]/span');

        $I->click('//div[@class="advgb-social-icons"]//span[2]');
        $I->fillField('//div[@class="advgb-social-link"]//input', 'https://advancedgutenberg.com');

        $I->fillField('//button[text()="Preset Icons"]/ancestor::node()[1]/following-sibling::node()//input', 'Twitter');
        $I->waitForElement('//div[@class="advgb-icon-items-wrapper"]//div[@class="advgb-icon-item"]/span');
        $I->click('//div[@class="advgb-icon-items-wrapper"]//div[@class="advgb-icon-item"]/span');
    }

    public function createCountUpBlock(AcceptanceTester $I)
    {
        /***** Add Count Up*****/
        $I->insertBlock('Count Up');

        $I->waitForElement('//label[text()="Columns"]/following-sibling::node()/following-sibling::node()');
        $I->fillField('//label[text()="Columns"]/following-sibling::node()/following-sibling::node()', 3);

        $I->waitForElement('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-one"]//h4');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-one"]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Visitors');

        $I->click('//div[contains(@class, "advgb-count-up")]/div[@class="advgb-count-up-columns-one"]/div[@class="advgb-counter"]//div[contains(@class, "advgb-counter-number")]');
        $I->selectCurrentElementText();
        $I->pressKeys('3 M');

        $I->click('//div[contains(@class, "advgb-count-up")]/div[@class="advgb-count-up-columns-one"]//p[contains(@class, "advgb-count-up-desc")]');
        $I->selectCurrentElementText();
        $I->pressKeys('per year');


        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-two"]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Downloaded');

        $I->click('//div[contains(@class, "advgb-count-up")]/div[@class="advgb-count-up-columns-two"]/div[@class="advgb-counter"]//div[contains(@class, "advgb-counter-number")]');
        $I->selectCurrentElementText();
        $I->pressKeys('180 000');

        $I->click('//div[contains(@class, "advgb-count-up")]/div[@class="advgb-count-up-columns-one"]//p[contains(@class, "advgb-count-up-desc")]');
        $I->selectCurrentElementText();
        $I->pressKeys('times');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-three"]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Developed since');

        $I->click('//div[contains(@class, "advgb-count-up")]/div[@class="advgb-count-up-columns-three"]/div[@class="advgb-counter"]//div[contains(@class, "advgb-counter-number")]');
        $I->selectCurrentElementText();
        $I->pressKeys('2010');

        $I->click('//div[contains(@class, "advgb-count-up")]/div[@class="advgb-count-up-columns-three"]//p[contains(@class, "advgb-count-up-desc")]');
        $I->selectCurrentElementText();
        $I->pressKeys(\WebDriverKeys::DELETE);
    }

    public function createAdvListBlock(AcceptanceTester $I)
    {
        /***** Add Advanced List *****/
        $I->insertBlock('Advanced List');

        $I->pressKeys('Item 1'.\WebDriverKeys::ENTER.'Item 2'.\WebDriverKeys::ENTER.'Item 3'.\WebDriverKeys::ENTER.'Item 4');

        $I->waitForElement('//div[@class="advgb-icon-items-wrapper"]//div[contains(@class, "advgb-icon-item")][4]/span');
        $I->click('//div[@class="advgb-icon-items-wrapper"]//div[contains(@class, "advgb-icon-item")][4]/span');
    }

    public function createAdvVideoBlock(AcceptanceTester $I)
    {
        /***** Add Advanced Video *****/
        $I->insertBlock('Advanced Video');

        $I->fillField('//div[@class="advgb-video-block"]//input', 'https://vimeo.com/264060718');
        $I->click('Fetch');

        $I->waitForElement('//div[@class="advgb-current-video-desc"]//span[@title="vimeo"]');
    }

    public function createAccordionBlock(AcceptanceTester $I)
    {
        /***** Add Accordion *****/
        $I->insertBlock('Advanced Accordion');
        $I->waitForElement('.advgb-accordions-wrapper');

        $I->fillField('//div[@data-type="advgb/accordion-item"][1]//div[@class="advgb-accordion-item"]//h4', 'Accordion title 1');
        $I->click('//div[@data-type="advgb/accordion-item"][1]//div[@class="advgb-accordion-item"]//div[@class="advgb-accordion-body"]//div[contains(@class, "editor-inner-blocks")]');
        $I->pressKeys('Flexi umentia agitabilis bene. Circumdare orbis iuga in locis convexi. Vesper mentisque alto neu. Levius circumdare perpetuum ventis aethere.');

        $I->fillField('//div[@data-type="advgb/accordion-item"][2]//div[@class="advgb-accordion-item"]//h4', 'Accordion title 2');
        $I->click('//div[@data-type="advgb/accordion-item"][2]//div[@class="advgb-accordion-item"]//div[@class="advgb-accordion-body"]//div[contains(@class, "editor-inner-blocks")]');
        $I->pressKeys('Dextra galeae moles. Erat: ponderibus valles circumdare tuti sic? Orbis limitibus recens titan inmensa extendi valles nisi aera.');

        $I->pressKeys(\WebDriverKeys::DOWN);
    }

    public function createProductsBlock(AcceptanceTester $I)
    {
        /***** Add Woo Products *****/
        $I->insertBlock('Woo Products');
        // todo: Modify some content here
    }

    public function createSummaryBlock(AcceptanceTester $I)
    {
        /***** Add some heading *****/
        $I->insertBlock('Heading');

        $I->waitForElement('//div[@data-type="core/heading"]//h2');
        $I->pressKeys('I am');

        $I->insertBlock('Heading');

        $I->waitForElement('//div[@data-type="core/heading"]//h2');
        $I->pressKeys('your father');
        $I->click('//p[text()="Level"]/following-sibling::node()//button[contains(@aria-label, "Heading 3")]');

        /***** Add summary *****/
        $I->insertBlock('Summary');
    }

    public function createNewsletterBlock(AcceptanceTester $I)
    {
        /***** Add Newsletter *****/
        $I->insertBlock('Newsletter');

        // Change color to blue
        try {
            $I->click('//span[text()="Border Color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[2]');
        } catch (Exception $e) {}

        try {
            $I->click('//span[text()="Border Color"]/following-sibling::node()//div[2]');
        } catch (Exception $e) {}

        // Change background color to white
        try {
            $I->click('//span[text()="Background Color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[5]');
        } catch (Exception $e) {}

        try {
            $I->click('//span[text()="Background Color"]/following-sibling::node()//div[5]');
        } catch (Exception $e) {}

        // Change border settings
        $I->click('//button[text()="Border Settings"]');
        // Change border color to blue
        $I->click('//span[text()="Border Color"]');
        try {
            $I->click('//span[text()="Border Color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[1]');
        } catch (Exception $e) {}

        try {
            $I->click('//span[text()="Border Color"]/following-sibling::node()//div[1]');
        } catch (Exception $e) {}
        // Change border radius to 4px
        $I->fillField('//label[text()="Border radius (px)"]/following-sibling::node()/following-sibling::node()', 4);

        // Change submit button color to white
        $I->click('//span[text()="Color Settings"]');
        try {
            $I->click('//span[text()="Border and Text"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[5]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Border and Text"]/following-sibling::node()//div[5]');
        } catch (Exception $e) {}

        // Change submit button background color to blue
        try {
            $I->click('//span[text()="Background"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[1]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Background"]/following-sibling::node()//div[1]');
        } catch (Exception $e) {}

        // Change submit button border radius to 4px
        $I->fillField('//label[text()="Button border radius"]/following-sibling::node()/following-sibling::node()', 4);
    }

    public function createContactFormBlock(AcceptanceTester $I)
    {
        /***** Add Contact Form *****/
        $I->insertBlock('Contact Form');

        // Change color to blue
        try {
            $I->click('//span[text()="Text color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[2]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Text color"]/following-sibling::node()//div[2]');
        } catch (Exception $e) {}

        // Change background color to white
        try {
            $I->click('//span[text()="Background color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[5]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Background color"]/following-sibling::node()//div[5]');
        } catch (Exception $e) {}

        // Change border settings
        $I->click('//button[text()="Border Settings"]');
        // Change border color to blue
        $I->click('//span[text()="Border Color"]');
        try {
            $I->click('//span[text()="Border color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[1]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Border color"]/following-sibling::node()//div[1]');
        } catch (Exception $e) {}
        // Change border radius to 4px
        $I->fillField('//label[text()="Border radius (px)"]/following-sibling::node()/following-sibling::node()', 4);

        // Change submit button color to white
        $I->click('//span[text()="Color Settings"]');
        try {
            $I->click('//span[text()="Border and Text"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[5]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Border and Text"]/following-sibling::node()//div[5]');
        } catch (Exception $e) {}
        // Change submit button background color to blue
        try {
            $I->click('//span[text()="Background"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[1]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Background"]/following-sibling::node()//div[1]');
        } catch (Exception $e) {}
        // Change submit button border radius to 4px
        $I->fillField('//label[text()="Button border radius"]/following-sibling::node()/following-sibling::node()', 4);
        // Change button position to center
        $I->selectOption('//label[text()="Button position"]/following-sibling::node()', array('text' => 'Center'));
    }

    public function createSearchBarBlock(AcceptanceTester $I)
    {
        /***** Add Search Bar *****/
        $I->insertBlock('Search Bar');
        $I->waitForElement('.advgb-search-bar-wrapper');

        // Change search icon
        try {
            $I->click('//span[text()="Search icon"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[3]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Search icon"]/following-sibling::node()//div[3]');
        } catch (Exception $e) {}

        // Change width to full width
        $I->click('//label[text()="Full width"]/preceding-sibling::node()');

        // Change input settings
        $I->click('//button[text()="Search Input Settings"]');
        // Change search input placeholder
        $I->fillField('//label[text()="Search placeholder"]/following-sibling::node()', "Search now");

        // Change input background color to black
        $I->click('//span[text()="Input Color"]');

        try {
            $I->click('//span[text()="Background color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[3]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Background color"]/following-sibling::node()//div[3]');
        } catch (Exception $e) {}

        // Change input text color to white
        try {
            $I->click('//span[text()="Text color"]/parent::legend[1]/parent::fieldset[1]/div[1]/div[5]');
        } catch (Exception $e) {}
        try {
            $I->click('//span[text()="Text color"]/following-sibling::node()//div[5]');
        } catch (Exception $e) {}
    }

    public function createLoginFormBlock(AcceptanceTester $I)
    {
        /***** Add Login Form *****/
        $I->insertBlock('Login/Register Form');
        $I->waitForElement('.advgb-lores-form-wrapper');

        // Change submit button text color to white
        $I->click('//span[text()="Border and Text"]/following-sibling::node()//div[5]');
        // Change submit button background color to black
        $I->click('//span[text()="Background"]/following-sibling::node()//div[3]');
        // Change submit button border radius to 4px
        $I->fillField('//label[text()="Button border radius"]/following-sibling::node()/following-sibling::node()', 4);
        // Change button position to center
        $I->selectOption('//label[text()="Button position"]/following-sibling::node()', array('text' => 'Center'));
    }

    public function createTabsBlock(AcceptanceTester $I)
    {
        /***** Add Tabs *****/
        $I->insertBlock('Tabs');
        // todo: Modify some content here
    }

    public function createColumnsBlock(AcceptanceTester $I)
    {
        /***** Add Columns block *****/
        $I->insertBlock('Columns Manager');

        // Choose layout 3 columns
        $I->waitForText('Pickup a columns layout');
        $I->click('//div[contains(@class, "advgb-columns-select-layout")]/div[contains(@class, "advgb-columns-layout")][9]');

        // Insert content to column 1
        try {
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:first-child .block-list-appender');
            $I->waitForElement('.block-editor-inserter__popover .components-popover__content');
            $I->wait(0.2); // wait for animation done
            // Insert paragraph block
            $I->fillField(['xpath'=>'//input[contains(@id, \'block-editor-inserter__search-\')]'], 'Paragraph');
            $I->waitForText('Paragraph');
            $I->click('Paragraph');
        } catch (Exception $e) {
            // not latest gutenberg
        }

        $I->click('//div[@class="advgb-columns-wrapper"]/div[contains(@class,"advgb-columns")]/div[contains(@class, "editor-inner-blocks")]/div[contains(@class,"editor-block-list__layout")]/div[contains(@class,"wp-block")][1]//div[contains(@class, "advgb-column")]');
        $I->selectCurrentElementText();
        $I->pressKeys("First column text");

        // Insert content to column 2
        try {
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:nth-child(2)');
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:nth-child(2) .block-list-appender');
            $I->waitForElement('.block-editor-inserter__popover .components-popover__content');
            $I->wait(0.2); // wait for animation done
            // Insert paragraph block
            $I->fillField(['xpath'=>'//input[contains(@id, \'block-editor-inserter__search-\')]'], 'Paragraph');
            $I->waitForText('Paragraph');
            $I->click('Paragraph');
        } catch (Exception $e) {
            // not latest gutenberg
        }

        $I->click('//div[@class="advgb-columns-wrapper"]/div[contains(@class,"advgb-columns")]/div[contains(@class, "editor-inner-blocks")]/div[contains(@class,"editor-block-list__layout")]/div[contains(@class,"wp-block")][2]//div[contains(@class, "advgb-column")]');
        $I->selectCurrentElementText();
        $I->pressKeys("Second column text");

        // Insert content to column 3
        try {
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:last-child');
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:last-child .block-list-appender');
            $I->waitForElement('.block-editor-inserter__popover .components-popover__content');
            $I->wait(0.2); // wait for animation done
            // Insert paragraph block
            $I->fillField(['xpath'=>'//input[contains(@id, \'block-editor-inserter__search-\')]'], 'Paragraph');
            $I->waitForText('Paragraph');
            $I->click('Paragraph');
        } catch (Exception $e) {
            // not latest gutenberg
        }

        $I->click('//div[@class="advgb-columns-wrapper"]/div[contains(@class,"advgb-columns")]/div[contains(@class, "editor-inner-blocks")]/div[contains(@class,"editor-block-list__layout")]/div[contains(@class,"wp-block")][3]//div[contains(@class, "advgb-column")]');
        $I->selectCurrentElementText();
        $I->pressKeys("Third column text");

        $I->clickWithLeftButton('//button[contains(@data-label, "Document")]');
    }

    public function publishPost(AcceptanceTester $I)
    {
        /***** Publish Post *****/
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');
    }
}
