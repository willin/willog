<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Root extends MY_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index($p=false,$page=false)
	{
        $this->load->model('m_users');
        //var_dump( $this->m_users->delete(array('username'=>'wzl','nickname'=>'wzl','nouser'=>'23','password'=>'123','reset_key'=>true)) );

        if($p=='page'){

        }
	}

    public function posts($id_or_slug){
        if(is_numeric($id_or_slug))
            echo 'number<br>';
    }
}

/* End of file root.php */
/* Location: ./application/controllers/root.php */