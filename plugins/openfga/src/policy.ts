import {
  AuthorizeResult,
  PolicyDecision,
} from '@backstage/plugin-permission-common';
import {
  PermissionPolicy,
  PolicyQuery,
} from '@backstage/plugin-permission-node';

import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';

export class AOpenFgaCatalogPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    _user?: BackstageIdentityResponse,
  ): Promise<PolicyDecision> {
    if (request.permission.name === 'catalog.entity.delete') {
      return {
        result: AuthorizeResult.DENY,
      };
    }

    return {
      result: AuthorizeResult.ALLOW,
    };
  }
}
