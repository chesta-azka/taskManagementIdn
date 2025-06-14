<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Branch;
use App\Models\Board;
use App\Models\Task;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        $branches = [
            'Cabang Pamijahan',
            'Cabang Solo',
            'Cabang Sentul',
        ];

        foreach ($branches as $branchName) {
            $branch = Branch::create([
                'name' => $branchName,
            ]);

            $boards = [
                'To Do',
                'In Progress',
                'Done',
            ];

            foreach ($boards as $boardName) {
                $board = $branch->boards()->create([
                    'name' => $boardName,
                ]);

                // Seed example tasks for "To Do" board only
                if ($boardName === 'To Do') {
                    $board->tasks()->createMany([
                        [
                            'title' => 'Diskusi proyek',
                            'order' => 1,
                        ],
                        [
                            'title' => 'Riset kebutuhan user',
                            'order' => 2,
                        ],
                    ]);
                }

                // Example task in "In Progress"
                if ($boardName === 'In Progress') {
                    $board->tasks()->create([
                        'title' => 'Implementasi frontend',
                        'order' => 1,
                    ]);
                }

                // Example task in "Done"
                if ($boardName === 'Done') {
                    $board->tasks()->create([
                        'title' => 'Setup hosting awal',
                        'order' => 1,
                    ]);
                }
            }
        }
    }
}
