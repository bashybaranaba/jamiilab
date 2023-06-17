import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: any[];
}

export default function ProjectsList(props: Props) {
  const { projects } = props;
  return (
    <Grid container spacing={1}>
      {projects &&
        projects.map((project, i) => (
          <ProjectCard data={project.data} key={i} />
        ))}
    </Grid>
  );
}
