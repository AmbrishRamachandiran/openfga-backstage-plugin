import fetch from 'node-fetch';
import { Config } from '@backstage/config';

interface OpenFgaRequest {
  tuple_key: { user: string; relation: string; object: string };
  authorization_model_id: string;
}

interface OpenFgaResponse {
  allowed: boolean;
}

let permissionResponse: OpenFgaResponse | null = null;

export function getPermissionResponse(): OpenFgaResponse | null {
  return permissionResponse;
}

export async function sendPermissionRequest(entityName: string, action: string, userName: string): Promise<OpenFgaResponse> {
  // const openFgaBaseUrl =  config?.getOptionalString('openfga.baseUrl') 
  // const openFgaStoreId =  config?.getOptionalString('openfga.storeId')
  const openFgaBaseUrl = 'http://localhost:8080';
  const openFgaStoreId = '01J20QE9WMGWRRD7FSKJ703JJD';

  const url = `${openFgaBaseUrl}/stores/${openFgaStoreId}/check`;

  const relation = action.toLowerCase() === 'delete' ? 'catalog_entity_delete' : 'catalog_entity_read';

  const requestBody: OpenFgaRequest = {
    tuple_key: {
      user: `${userName}`,
      relation,
      object: `catalog_entity:${entityName}`,
    },
    authorization_model_id: '01J20QHJVYWEADD27RP36HT38A',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`OpenFGA API call failed with status: ${response.status}`);
  }

  const data: OpenFgaResponse = await response.json();
  permissionResponse = data;
  return data;
}
