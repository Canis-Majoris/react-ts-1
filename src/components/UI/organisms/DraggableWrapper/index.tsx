import React, { useState, useEffect, useCallback, memo, CSSProperties } from "react";
import { ReactNode } from "react";
import { DragDropContext, Droppable, Draggable, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface Props extends DragDropContext {
  items: ItemsArray;
  onDragEnd?: (indexesArray: Array<number | string>) => void;
  renderItem?: (item: Item, index: number, provided: DraggableProvidedDragHandleProps) => ReactNode;
  isDragDisabled: boolean,
};

type ItemsArray = Array<Item>;

interface Item {
  index: string | number;
}

interface ItemInListState extends Item {
  id: string;
}

type ItemsList = Array<ItemInListState>

// fake data generator
const getItems = (items: ItemsArray) =>
  items.map((item) => ({
    id: `item-${item.index}`,
    ...item,
  }));

// a little function to help us with reordering the result
const reorder = (list: ItemsList, startIndex: number, endIndex: number): ItemsList => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle?: CSSProperties | undefined) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: "none",  <-- This wasn't right (doesn't belong in styles)
  // paddingTop: '1rem',
  marginBottom: "1rem",
  // change background colour if dragging
  opacity: isDragging ? 0.8 : 1,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({});

const DraggableWrapper = ({
  items,
  onDragEnd,
  renderItem,
  isDragDisabled,
  ...rest
}: Props) => {
  const [itemsList, setItemsList] = useState<ItemsList | []>([]);

  useEffect(() => {
    items && Array.isArray(items) && setItemsList(getItems(items));
  }, [items]);

  const handleDragEnd = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      const reorderedItems = reorder(
        itemsList,
        result.source.index,
        result.destination.index
      );

      setItemsList(reorderedItems);
      onDragEnd && onDragEnd(reorderedItems.map(({ index }) => index));
    },
    [itemsList]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd} {...rest}>
      <Droppable droppableId='droppable'>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {itemsList.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
                isDragDisabled={isDragDisabled}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {renderItem &&
                      renderItem(item, index, provided.dragHandleProps)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(DraggableWrapper);
