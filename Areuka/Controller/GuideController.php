<?php
namespace Areuka\Controller;

class GuideController extends Controller {
    public function homePage(){
        return $this->view("guide.home", [], "colors.structure");
    }
}