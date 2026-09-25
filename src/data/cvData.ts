import { CVData } from '../types/cv';
import cvDataJson from './cvData.json';

// La fuente de la verdad de todos los datos del CV y proyectos es cvData.json
export const cvData: CVData = cvDataJson as unknown as CVData;
