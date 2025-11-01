import { projects as projectsData } from "../data/projects";
import { experiences as experiencesData } from "../data/experience";
import { codeSymbols as symbolsData } from "../data/symbols";

export const projects = Object.freeze(projectsData.map(p => Object.freeze(p)));

export const experiences = Object.freeze(experiencesData.map(e => Object.freeze({
  ...e,
  responsibilities: Object.freeze(e.responsibilities),
  technologies: Object.freeze(e.technologies),
})));

export const codeSymbols = Object.freeze(symbolsData.map(s => Object.freeze(s)));

