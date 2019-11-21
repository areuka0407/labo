<?php
namespace Areuka\Controller;

class OptionController extends Controller {
    public function userPage(){
        return $this->view("option.user", [], "colors.structure");
    }
    public function imagePage(){
        return $this->view("option.image", [], "colors.structure");
    }
    public function passwordPage(){
        return $this->view("option.password", [], "colors.structure");
    }
}