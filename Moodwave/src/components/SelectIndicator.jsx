import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

const SelectIndicator = () => {
  return (
    <Select
      placeholder="Select a playlist..."
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 240,
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      <Option value="p1">Playlist 1</Option>
      <Option value="p2">Playlist 2</Option>
      <Option value="p3">Playlist 3</Option>
      <Option value="p4">Playlist 4</Option>
    </Select>
  );
};

export default SelectIndicator;
