const localhost = process.env.PLATFORM === 'linux' ? 'localhost' : 'host.docker.internal';

module.exports = {
  routes: {
    '/apps/cost-management': {
      host: `http://${localhost}:8002`,
    },
    '/beta/apps/cost-management': {
      host: `http://${localhost}:8002`,
    },
    // New URLs
    '/openshift/cost-management': {
      host: `http://${localhost}:8002`,
    },
    '/beta/openshift/cost-management': {
      host: `http://${localhost}:8002`,
    },
    // For testing cloud-services-config https://github.com/RedHatInsights/cloud-services-config#testing-your-changes-locally
    // '/beta/config': {
    //   host: `http://${localhost}:8889`,
    // },
    //
    // The overrides below are not necessary for typical development
    // '/apps/chrome': {
    //   host: 'https://ci.cloud.paas.upshift.redhat.com',
    // },
    // '/apps/beta/chrome': {
    //   host: 'https://ci.cloud.paas.upshift.redhat.com',
    // }
  },
};
