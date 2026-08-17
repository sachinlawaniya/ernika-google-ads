import { useLocation } from 'react-router-dom';

export function useProjectContext() {
  const { pathname } = useLocation();
  const isElegance = pathname.startsWith('/elegance');

  return {
    isElegance,
    isErnika: !isElegance,
    projectName: isElegance ? 'Guru Punvaanii Elegance' : 'Guru Punvaanii Ernika',
    shortName: isElegance ? 'Elegance' : 'Ernika',
    basePath: isElegance ? '/elegance' : '/ernika',
  };
}
