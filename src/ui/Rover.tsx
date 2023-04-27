import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { RoverModel } from "../data/RoverModel";
import { useCallback, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LineInfo from "./LineInfo";
export default function Rover(props: { rover: RoverModel }) {
  const { rover } = props;
  const [expanded, setExpanded] = useState(false);
  const handleExpand = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setExpanded(!expanded);
    },
    [expanded]
  );
  return (
    <Link
      to={`/rovers/${rover.id}/${rover.name}`}
      className="rover"
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      <Card
        sx={{
          bgcolor: grey[100],
          "&:hover": {
            bgcolor: grey[300],
          },
        }}
        elevation={4}
      >
        <CardHeader title={rover.name} />
        <Divider />
        <CardContent>
          <LineInfo label="Landing date" value={rover.landing_date} />
          <LineInfo label="Launch date" value={rover.launch_date} />
          <LineInfo
            label="Total photos"
            value={rover.total_photos.toString()}
          />
          <Divider sx={{ my: 1 }} />
          <LineInfo label="Cameras" value={rover.cameras.length.toString()} />
          {rover.cameras.slice(0, 3).map((camera) => (
            <Typography key={camera.id} sx={{ pl: 2, fontSize: 12 }}>
              {camera.name}
            </Typography>
          ))}
          {expanded && (
            <Collapse in={expanded} timeout="auto">
              {rover.cameras.slice(3, rover.cameras.length).map((camera) => (
                <Typography key={camera.id} sx={{ pl: 2, fontSize: 12 }}>
                  {camera.name}
                </Typography>
              ))}
            </Collapse>
          )}
          {Boolean(rover.cameras.length > 3) && (
            <IconButton onClick={handleExpand} sx={{ ml: 2 }}>
              {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
