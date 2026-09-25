import avatarImg from '../assets/images/avatar.jpeg';
import { CVData } from '../types/cv';

export function preloadAllCVImages(cvData: CVData) {
  if (typeof window === 'undefined') return;

  const urlsToPreload: string[] = [avatarImg];

  // Project cover images and screenshots
  if (cvData.projects && Array.isArray(cvData.projects)) {
    cvData.projects.forEach((project) => {
      if (project.coverImage) urlsToPreload.push(project.coverImage);
      if (project.sections && Array.isArray(project.sections)) {
        project.sections.forEach((sec) => {
          if (sec.imageUrl) urlsToPreload.push(sec.imageUrl);
        });
      }
    });
  }

  // Certificate images
  if (cvData.certificates && Array.isArray(cvData.certificates)) {
    cvData.certificates.forEach((cert) => {
      if (cert.imageUrl) urlsToPreload.push(cert.imageUrl);
    });
  }

  // Preload in parallel with high priority into browser cache
  urlsToPreload.forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  });
}
