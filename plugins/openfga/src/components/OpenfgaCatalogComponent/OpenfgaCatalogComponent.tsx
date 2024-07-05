import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, FormLabel, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sendPermissionRequest } from '../../client'; 


import { useApi, identityApiRef } from '@backstage/core-plugin-api';
import { CATALOG_FILTER_EXISTS, catalogApiRef } from '@backstage/plugin-catalog-react';

const entityOptions = ['acme', 'test', 'entitytest', 'acmetest', 'example-website'];
const actionOptions = ['Read', 'Delete'];

const useStyles = makeStyles({
  success: {
    color: 'green',
  },
  danger: {
    color: 'red',
  },
  info: {
    color: 'blue',
  },
});

export const OpenfgaCatalogComponent = () => {
  const classes = useStyles();
  const [entities, setEntities] = useState <any>([]);
  const [user, setUser] = useState <any>('');
  const [selectedEntity, setSelectedEntity] = useState(entityOptions[0]);
  const [selectedAction, setSelectedAction] = useState(actionOptions[0]);
  const [allowMessage, setAllowMessage] = useState('');
  const [denyMessage, setDenyMessage] = useState('');
  const catalogApi = useApi(catalogApiRef);
  const identityApi = useApi(identityApiRef);

  const handleEntityChange = (event:any) => {
    setSelectedEntity(event.target.value);
  };

  const handleActionChange = (event:any) => {
    setSelectedAction(event.target.value);
  };

  const fetchEntities = async () => {
    try {
      const {items} = await catalogApi.getEntities({ 
        fields: ['metadata.name'],
        filter: {
          'kind=component':
            CATALOG_FILTER_EXISTS,
        },
      });
      const entityNames = items.map((entity) => entity.metadata.name);
      const {ownershipEntityRefs} = await identityApi.getBackstageIdentity()
      setUser(ownershipEntityRefs);
      setEntities(entityNames); 
    } catch (error) {
      console.error('Error fetching catalog entities:', error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  const handleActivatePolicy = async () => {
    const response = await sendPermissionRequest(selectedEntity, selectedAction, user);
    if (response.allowed) {
      setAllowMessage(`${user} Has permission to ${selectedAction} the ${selectedEntity}`);
    } else {
      setDenyMessage(`${user} Don't have permission to ${selectedAction} the ${selectedEntity}`);
    }
    setTimeout(() => {
      setAllowMessage('');
      setDenyMessage('');
    }, 5000);
  };

  return (
    <>
    <Box sx={{ border: 1, borderRadius: 0, p: 2, width: '100%' }}>
      <Typography className={classes.info} variant="body2" gutterBottom>
       CURRENT USER : {user}
      </Typography>
      <Typography variant="h6" gutterBottom>
        CATALOG PERMISSION POLICY
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl fullWidth>
          <FormLabel>Select Entity</FormLabel>
          <Select
            value={selectedEntity}
            onChange={handleEntityChange}
            label="Select Entity"
            sx={{ width: '100%' }}
          >
             {entities.map((entityName:any) => (
              <MenuItem key={entityName} value={entityName}>
                {entityName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Select Action</FormLabel>
          <Select
            value={selectedAction}
            onChange={handleActionChange}
            label="Select Action"
            sx={{ width: '100%' }}
          >
            {actionOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          className={classes.success}
          variant="contained"
          onClick={handleActivatePolicy}
        >
          Start Policy
        </Button>
      </Box>
      {allowMessage && (
        <Typography className={classes.success} variant="body2" sx={{ color: 'green' }}>
          {allowMessage}
        </Typography>
      )}
      {denyMessage && (
        <Typography className={classes.danger} variant="body2" sx={{ color: 'red' }}>
          {denyMessage}
        </Typography>
      )}
    </Box>
    {/* <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h6" gutterBottom>
       MODIFY CATALOG PERMISSION POLICY
      </Typography>
    </Box> */}
    </>
  );
};
