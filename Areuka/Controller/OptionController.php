<?php
namespace Areuka\Controller;

class OptionController extends Controller {
    public function homePage(){
        return $this->view("option.home", [], "colors.structure");
    }
}