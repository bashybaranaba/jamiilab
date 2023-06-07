import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";

interface Props {
  projets: any[];
}

export default function ProjectsList(props: Props) {
  const { projets } = props;
  return (
    <Grid container spacing={1}>
      {projets &&
        projets.map((projet, i) => <ProjectCard data={projet} key={i} />)}
    </Grid>
  );
}
