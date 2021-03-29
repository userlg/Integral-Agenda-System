<?php

    namespace App\Utility;

    class Connection{

        private $ip = "207.246.118.141";
        private $username = "rei";
        private $password = "3wsf5x29XQ";
        private $rootDomain = '8020rei.com';
        private $dirServe = '/public_html/companies/';

        public function __construct() {
        }

        public function __construct2($ip,$username,$password,$rootDomain,$dirServe) {
            $this->ip = $ip;
            $this->username = $username;
            $this->password = $password;
            $this->rootDomain = $rootDomain;
            $this->dirServe = $dirServe;
        }

        public function getIp(){
            return $this->ip;
        }
        public function setIp($ip){
            $this->ip = $ip;
        }

        public function getUserName(){
            return $this->username;
        }
        public function setUserName($username){
            $this->username = $username;
        }

        public function getPassword(){
            return $this->password;
        }
        public function setPassword($password){
            $this->password = $password;
        }
        
        public function getRootDomain(){                 
            return $this->rootDomain;                     
        }                                               
        public function setRootdomain($rootDomain){    
            $this->rootDomain = $rootDomain;          
        }                                            

        public function getDirServe(){
            return $this->dirServe;
        }
        public function setDirServe($dirServe){
            $this->dirServe = $dirServe;
        }
    }
?>