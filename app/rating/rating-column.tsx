import { Droppable } from "@hello-pangea/dnd";
import RestaurantDraggable from "./restaurant-draggable";
import { RestRating } from "./types";
import CircularProgressBar from "../../components/progressBar/circularProgressBar";

const RatingColumns = (params: {
  restaurantsLeft: RestRating[];
  restaurantsRight: RestRating[];
  onSubmit: () => void;
  isSubmitting: boolean;
}) => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-1/2 mr-12">
        <h1 className="text-center text-5xl font-semibold mb-6 text-text-color-p mt-40">
          Drag your favorite restaurant to left
        </h1>
        <Droppable droppableId="restaurants-left" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className={`flex flex-wrap w-fit rounded-2xl bg-opacity-20 ${
                snapshot.isDraggingOver ? "border-2 border-card" : null
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {params.restaurantsLeft.map((r, i) => (
                <RestaurantDraggable key={r.id} restaurant={r} index={i} isLeft={true} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
      <div className="w-1/2 mt-12">
        <div className="text-center text-xl text-text-color-p">Your Top 10</div>
        <Droppable droppableId="restaurants-right">
          {(provided, snapshot) => (
            <div className="flex flex-col ">
              <div
                className={`min-h-60 rounded-2xl bg-opacity-10 ${
                  snapshot.isDraggingOver ? "border-2 border-card" : null
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {params.restaurantsRight.map((r, i) => (
                  <RestaurantDraggable key={r.id} restaurant={r} index={i} isLeft={false} />
                ))}
                {provided.placeholder}
              </div>
              {!params.isSubmitting ? (
                <button
                  className={`w-min mx-auto bg-button px-8 py-2 rounded-lg mt-6 bg-card text-text-color-s  ${
                    params.restaurantsRight.length == 10 ? "visible" : "invisible"
                  }`}
                  onClick={params.onSubmit}
                >
                  submit
                </button>
              ) : (
                <div className="mx-auto">
                  <CircularProgressBar />
                </div>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};
export default RatingColumns;
