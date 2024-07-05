// import { AOpenFgaCatalogPolicy } from './policy';
// import { createBackendModule } from '@backstage/backend-plugin-api';
// import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';

// export const permissionModuleACatalogPolicy = createBackendModule({
//   pluginId: 'permission',
//   moduleId: 'a-name-policy',
//   register(reg) {
//     reg.registerInit({
//       deps: { policy: policyExtensionPoint },
//       async init({ policy }) {
//         policy.setPolicy(new AOpenFgaCatalogPolicy());
//       },
//     });
//   },
// });

import { AOpenFgaCatalogPolicy } from './policy';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';
import { Config } from '@backstage/config';
import { configApiRef, useApi } from '@backstage/core-plugin-api';

export const permissionModuleACatalogPolicy = createBackendModule({
  pluginId: 'permission',
  moduleId: 'a-name-policy',
  register(reg) {
    reg.registerInit({
      deps: { policy: policyExtensionPoint },
      async init({ policy }) {
        // Accessing the configuration from the backend environment
        // const config: Config = useApi(configApiRef);

        policy.setPolicy(new AOpenFgaCatalogPolicy());
      },
    });
  },
});
