import fs from 'fs';
import path from 'path';

export async function generateStaticParams(projectName) {
  const projectDirPath = path.join(process.cwd(), '..');
  const rootDirFiles = fs.readdirSync(projectDirPath);
  const rootDirProjects = rootDirFiles.filter((dir) => dir.includes('-Projects'));

  const mainPaths = rootDirProjects.filter((dir) => (
    dir.replace('-Projects', '').replace('-', '').toLowerCase() === projectName.toLowerCase()
  ));
  const projectDir = path.join(process.cwd(), '..', mainPaths[0]);
  const subProjectDir = fs.readdirSync(projectDir);

  const levels = [
    { level: 'Basic', subDir: subProjectDir.filter(project => project.includes('Basic')) },
    { level: 'Intermediate', subDir: subProjectDir.filter(project => project.includes('Intermediate')) },
    { level: 'Advanced', subDir: subProjectDir.filter(project => project.includes('Advanced')) }
  ];

  const allProjects = levels
    .filter(item => item.subDir.length > 0)
    .flatMap(item =>
      fs.readdirSync(path.join(projectDir, item.subDir[0])).map(dir =>
        path.join(projectDir, item.level, dir)
      )
    );

  if (allProjects.length > 0) return allProjects;
  return null;
}
