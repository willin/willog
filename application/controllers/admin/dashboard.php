<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * willog
 * Author:  willin
 * Created: 2013-08-11 20:39
 * File:    dashboard.php
 */
require_once('Admin_Controller.php');

class Dashboard extends Admin_Controller {

    public function index()
    {
        $this->admin_view(array('page'=>'dashboard','index'=>1));
    }


}

/* End of file dashboard.php */
/* Location: ./application/controllers/admin/dashboard.php */