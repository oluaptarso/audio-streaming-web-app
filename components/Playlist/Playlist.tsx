import { useSelector } from "react-redux";
import { RootState } from "store/store";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import PlaylistItem from "./components/PlaylistItem";
import styles from "./Playlist.module.scss";
import { useDispatch } from "react-redux";
import { reorderPlaylist } from "providers/audioPlayerSlice";

export type PlaylistProps = {
  className?: string;
};

const Playlist: React.FC<PlaylistProps> = ({ className }) => {
  
  const { playlist, currentMusic } = useSelector(
    (state: RootState) => state.audioPlayerStore
  );

  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    dispatch(
      reorderPlaylist({ startIndex: source.index, endIndex: destination.index })
    );
  };

  return (
    <div className={`${className} ${styles.playlistContainer}`}>
      <h2>Playlist</h2>
      {playlist.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="playlist">
            {(
              provided: DroppableProvided
            ) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {playlist.map((music, i) => (
                  <Draggable
                    key={music.id}
                    draggableId={music.id.toString()}
                    index={i}
                  >
                    {(
                      providedDraggable: DraggableProvided,
                    ) => (
                      <li
                        className={styles.playlistItemContainer}
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                      >
                        <PlaylistItem
                          music={music}
                          playing={music.id === currentMusic?.music.id}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className={styles.emptyPlaylist}>Play or add music to the playlist</div>
      )}
    </div>
  );
};

export default Playlist;
