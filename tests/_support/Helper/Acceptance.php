<?php

namespace Helper;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

class Acceptance extends \Codeception\Module
{

    public function dragAndDrop($xpath_from, $xpath_to, $sleep=0)
    {
        $webDriver = $this->getModule('WebDriver')->webDriver;

        $draggableElement = $webDriver->findElement(\WebDriverBy::xpath($xpath_from));
        $dropZone = $webDriver->findElement(\WebDriverBy::xpath($xpath_to));

        $webDriver->getMouse()->mouseMove($draggableElement->getCoordinates());
        sleep($sleep);
        $webDriver->getMouse()->mouseDown($draggableElement->getCoordinates());
        sleep($sleep);
        $webDriver->getMouse()->mouseMove($dropZone->getCoordinates());
        sleep($sleep);
        $webDriver->getMouse()->mouseUp();
    }
}
