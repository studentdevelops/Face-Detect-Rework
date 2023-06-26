export default function drawBoxes(boundingBoxes) {
    if (boundingBoxes) {
        return boundingBoxes?.map((box, index) => {
            const { left_col, top_row, right_col, bottom_row } = box?.region_info?.bounding_box;
            const boxStyle = {
                position: 'absolute',
                left: `${left_col * 100}%`,
                top: `${top_row * 100}%`,
                width: `${(right_col - left_col) * 100}%`,
                height: `${(bottom_row - top_row) * 100}%`,
                border: '2px solid red',
                boxSizing: 'border-box',
            };
            return <div key={index} style={boxStyle}></div>;
        });
    }
}

