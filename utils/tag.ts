import { Tag } from "../components/form/FormTask";

export const showTag = (tag: Tag) : string => {
   
   return tag.section ? `# ${tag.project?.name}/ ${tag.section.name}` : `# ${tag.project?.name}`
}