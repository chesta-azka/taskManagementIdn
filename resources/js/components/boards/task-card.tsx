import { Draggable } from '@hello-pangea/dnd';

interface Task {
  id: number;
  title: string;
  board_id: number;
}

interface Props {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-black p-3 rounded shadow-sm text-sm hover:bg-amber-900 transition cursor-pointer"
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
}
