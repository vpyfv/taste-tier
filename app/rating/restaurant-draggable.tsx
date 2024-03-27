import { Draggable } from "@hello-pangea/dnd";
import { RestRating } from "./types";

const RestaurantDraggable = (param: { restaurant: RestRating; index: number; isLeft: boolean }) => {
  return (
    <Draggable draggableId={param.restaurant.id.toString()} index={param.index}>
      {(provide) => (
        <div
          className="flex items-center text-text-color-p"
          ref={provide.innerRef}
          {...provide.draggableProps}
          {...provide.dragHandleProps}
        >
          <p className={`bg-card px-6 py-3 rounded-xl m-2 flex-1`}>{param.restaurant.name}</p>
          <p className={`${param.isLeft ? "invisible" : "visible text-2xl ml-2 font-semibold"}`}>{10 - param.index}</p>
        </div>
      )}
    </Draggable>
  );
};
export default RestaurantDraggable;
