import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  RouterProvider,
} from '@tanstack/react-router';

import Layout from '../layout';
import Loading from '../layout/Loading';

import DownLoads from '../pages/Downloads';
import Home from '../pages/Home';
import NExomes from '../pages/Neomers/Exomes';
import NGenomes from '../pages/Neomers/Genomes';
import PatientsGenomes from '../pages/Patients/Genomes';
import PatientsExomes from '../pages/Patients/Exomes';

import NotFound from '../pages/404NotFound';
import PrivacyAndLegal from '../pages/PrivacyAndLegal';

import { DEFAULT_NULLOMETER_QUERY_PARAMS } from '../constants';
import { queryClient } from '../lib/query-client';
import { fetchExomes, fetchGenomes } from '../services/nullomers.service';
import {
  fetchCancerTypesPatients,
  fetchEPatientDetails,
  fetchExomesPatients,
  fetchGenomesPatients,
  fetchGPatientDetails,
} from '../services/patients.service';
import PatientDetails from '../pages/Patients';
import AboutPage from '../pages/About';
import { predictPatient } from '../helpers';
import Visualazations from '../pages/Visualazations';
import {
  fetchCancerTypes,
  fetchJaccardIndex,
  fetchOrgans,
} from '../services/visualazation.service';
import HelpPage from '../pages/Help';

const rootRoute = createRootRoute({
  component: Layout,
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Neomer is a platform for exploring genomic data.',
      },
    ],
  }),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
  head: () => ({ meta: [{ title: '   Home' }] }),
});

const privacyAndLegalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyAndLegal,
  head: () => ({ meta: [{ title: 'NeomerDB | Privacy & Legal' }] }),
});

const neomerGenomesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/neomers/genomes',
  component: NGenomes,
  loader: async ({ location }) => {
    const searchParameters = new URLSearchParams(location.search);
    const query: Record<string, string> = {};
    for (const [key, value] of searchParameters.entries()) {
      query[`${key}`] = value;
    }

    await queryClient.prefetchQuery({
      queryKey: ['genomes', { ...DEFAULT_NULLOMETER_QUERY_PARAMS, ...query }],
      queryFn: () => fetchGenomes({ ...DEFAULT_NULLOMETER_QUERY_PARAMS, ...query }),
    });
  },
  head: () => ({ meta: [{ title: 'NeomerDB | Nullomers in Genomes' }] }),
});

const neomerExomesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/neomers/exomes',
  component: () => <NExomes />,
  loader: async ({ location }) => {
    const searchParameters = new URLSearchParams(location.search);
    const query: Record<string, string> = {};
    for (const [key, value] of searchParameters.entries()) {
      query[`${key}`] = value;
    }

    await queryClient.prefetchQuery({
      queryKey: ['exomes', { ...DEFAULT_NULLOMETER_QUERY_PARAMS, ...query }],
      queryFn: () => fetchExomes({ ...DEFAULT_NULLOMETER_QUERY_PARAMS, ...query }),
    });
  },
  head: () => ({ meta: [{ title: 'NeomerDB | Nullomers in Exomes' }] }),
});

const patientGenomesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patients/genomes',
  component: () => <PatientsGenomes />,
  loader: async () => {
    await queryClient.prefetchQuery({
      queryKey: ['patient/genomes'],
      queryFn: () => fetchGenomesPatients(),
    });

    await queryClient.prefetchQuery({
      queryKey: ['patient/cancer-types'],
      queryFn: () => fetchCancerTypesPatients(),
    });
  },
  head: () => ({ meta: [{ title: 'NeomerDB | Donors (Genomes)' }] }),
});

const patientExomesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patients/exomes',
  component: () => <PatientsExomes />,
  loader: async () => {
    await queryClient.prefetchQuery({
      queryKey: ['patient/exomes'],
      queryFn: () => fetchExomesPatients(),
    });

    await queryClient.prefetchQuery({
      queryKey: ['patient/cancer-types'],
      queryFn: () => fetchCancerTypesPatients(),
    });
  },
  head: () => ({ meta: [{ title: 'NeomerDB | Donors (Exomes)' }] }),
});

const patientDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patient/$patientId',
  component: () => <PatientDetails />,
  loader: async ({ params }) => {
    console.log('Loading patient details route with params:', params);
    const { patientId } = params as { patientId: string };
    if (!patientId) {
      throw new Error('Patient ID is required');
    }

    const searchParameters = new URLSearchParams(globalThis.location.search);
    const tab = searchParameters.get('tab') || predictPatient(patientId);

    await queryClient.prefetchQuery({
      queryKey: ['patient/details', patientId],
      queryFn: async () => {
        return tab === 'exomes' ? fetchEPatientDetails(patientId) : fetchGPatientDetails(patientId);
      },
    });
  },
  head: () => ({ meta: [{ title: 'NeomerDB | Patient Details' }] }),
});

const visualazationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/visualizations',
  component: () => <Visualazations />,
  loader: async () => {
    await queryClient.prefetchQuery({
      queryFn: () => fetchJaccardIndex(13),
      queryKey: ['jaccard_index', 13],
      staleTime: 1000 * 60 * 60,
    });

    await queryClient.prefetchQuery({
      queryKey: ['organs'],
      queryFn: () => fetchOrgans(),
      staleTime: 1000 * 60 * 60,
    });
    await queryClient.prefetchQuery({
      queryKey: ['cancer_types'],
      queryFn: () => fetchCancerTypes(),
      staleTime: 1000 * 60 * 60,
    });
  },
  head: () => ({ meta: [{ title: 'NeomerDB | Visualizations' }] }),
});

const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/help',
  component: () => <HelpPage />,
  head: () => ({ meta: [{ title: 'NeomerDB | Help' }] }),
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/404',
  component: () => <NotFound />,
  head: () => ({ meta: [{ title: 'NeomerDB | 404 - Page Not Found' }] }),
});

const downloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/downloads',
  component: () => <DownLoads />,
  head: () => ({ meta: [{ title: 'NeomerDB | Downloads' }] }),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <AboutPage />,
  head: () => ({ meta: [{ title: 'NeomerDB | About' }] }),
});

const catchNotFound = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => <NotFound />,
  beforeLoad: () => {
    throw redirect({
      to: '/404',
      replace: true,
    });
  },
  head: () => ({ meta: [{ title: 'NeomerDB | Not Found' }] }),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  neomerGenomesRoute,
  neomerExomesRoute,
  patientGenomesRoute,
  patientExomesRoute,
  patientDetailsRoute,
  privacyAndLegalRoute,
  visualazationsRoute,
  helpRoute,
  notFoundRoute,
  catchNotFound,
  downloadRoute,
  aboutRoute,
]);

const router = createRouter({
  routeTree,
  defaultPendingComponent: Loading,
});

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
