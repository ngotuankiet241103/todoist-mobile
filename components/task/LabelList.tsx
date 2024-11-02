import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { LabelSlice } from "../../redux/reducer/labelSlice";
import BaseShowLabel from "./BaseShowLabel";
import { getListStyle } from "../../utils/dragContext";
import LabelTagList from "./LabelTagList";
import useOpenModal from "../../hooks/useOpenModal";
import LabelContainer from "./LabelContainer";

const LabelList = ({ labels ,onClick}: { labels: LabelSlice,onClick: (value:string) => void }) => {
  const { isShow, handleToggleModel } = useOpenModal(false);
  const onDragStart = () => {};
  const onDragEnd = () => {};
  const handleAddLabel = (value: string) => {
    onClick(value);
    handleToggleModel();
  }
  return (
    <>
      <BaseShowLabel onClick={handleToggleModel} title="Labels">
        <DragDropContext
          // isDragging={(event) => console.log(event)}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <Droppable droppableId="droppable-1">
            {(provided, snapshot) => (
              <>
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {labels.length > 0 && (
                    <LabelTagList labels={labels}></LabelTagList>
                  )}
                  {provided.placeholder}
                </div>
              </>
            )}
          </Droppable>
        </DragDropContext>
      </BaseShowLabel>
      {isShow && <LabelContainer clickSubmit={handleAddLabel} clickCancle={handleToggleModel}></LabelContainer>}
    </>
  );
};

export default LabelList;
