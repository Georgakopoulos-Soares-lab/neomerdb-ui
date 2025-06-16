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

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const privacyAndLegalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyAndLegal,
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
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/404',
  component: () => <NotFound />,
});

const downloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/downloads',
  component: () => <DownLoads />,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => <AboutPage />,
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
