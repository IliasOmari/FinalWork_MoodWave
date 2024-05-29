import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/joy";

const SelectIndicator = (data) => {
  return (
    <Select
      onChange={(e) => console.log(e.target.value)}
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
      {data.playlists.map((el) => (
        <MenuItem key={el.name} value={el.name}>
          {el.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectIndicator;
