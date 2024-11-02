
import { LabelSlice } from "../../redux/reducer/labelSlice";
import { Draggable } from "react-beautiful-dnd";
import LabelTagItem from "./LabelTagItem";
import { getItemStyle } from "./TaskList";

const LabelTagList = ({ labels }: { labels: LabelSlice }) => {
    console.log(labels);
    
  return (
    <div>
      {labels.length > 0 &&
        labels.map((label, index) => (
          <Draggable index={index} draggableId={`${label.id}`} key={label.id}>
            {(provided, snapshot) => (
              <LabelTagItem
                isBorder={index==0}
                key={index}
                label={label}
                innerref={provided.innerRef}
                provided={provided}
                style={getItemStyle(
                  provided.draggableProps.style,
                  snapshot.isDragging,
                  snapshot
                )}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              />
            )}
          </Draggable>
        ))}
    </div>
  );
};

export default LabelTagList;
