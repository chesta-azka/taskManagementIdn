import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './task-card';

interface Task {
  id: number;
  title: string;
  board_id: number;
}

interface Board {
  id: number;
  name: string;
}

interface Props {
  board: Board;
  tasks?: Task[]; // optional, untuk menghindari undefined
}

export default function BoardColumn({ board, tasks = [] }: Props) {
  return (
    <Droppable droppableId={board.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-amber-600 p-4 rounded-lg w-64 min-w-[16rem] flex-shrink-0 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium truncate text-white">{board.name}</h3>
            {/* TODO: Tambah tombol + tugas di sini */}
          </div>

          <div className="space-y-2 min-h-[4rem]">
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
