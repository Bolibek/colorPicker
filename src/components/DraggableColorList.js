import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";
import {useDispatch, useSelector} from "react-redux";
import { removeColor } from "../app/actions";

const DraggableColorList = SortableContainer(() => {
  const dispatch = useDispatch();
  const {colors} = useSelector(state => state);
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => dispatch(removeColor(color.name))}
        />
      ))}
    </div>
  );
});
export default DraggableColorList;
