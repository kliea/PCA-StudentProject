<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Libraries\ZKLibrary;

class TestingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    protected $zk;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->zk = new ZKLibrary(env('BIOM_IP'), env('BIOM_PORT'));
        $this->zk->connect();
        // $users_data = $this->zk->getUser();
        // dump($users_data);
        // dd($this->zk->getUser());
        dd($this->zk->getAttendance());
    }
}
