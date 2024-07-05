import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, FormLabel, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { sendPermissionRequest } from '../../client'; // Import the request function


import { useApi } from '@backstage/core-plugin-api';
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
});

export const OpenfgaCatalogComponent = () => {
  const classes = useStyles();
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(entityOptions[0]);
  const [selectedAction, setSelectedAction] = useState(actionOptions[0]);
  const [allowMessage, setAllowMessage] = useState('');
  const [denyMessage, setDenyMessage] = useState('');
  const api = useApi(catalogApiRef);

  const handleEntityChange = (event) => {
    setSelectedEntity(event.target.value);
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const fetchEntities = async () => {
    try {
      const {items} = await api.getEntities({ // Replace with your actual endpoint
        fields: ['metadata.name'],
      });
      const entityNames = items.map((entity) => entity.metadata.name);
      console.log(items)
      setEntities(entityNames); // Set only entity names
    } catch (error) {
      console.error('Error fetching catalog entities:', error);
    }
  };

  useEffect(() => {
    fetchEntities(); // Call fetchEntities on component mount
  }, []);

  const handleActivatePolicy = async () => {
    const response = await sendPermissionRequest(selectedEntity, selectedAction);
    console.log(response)
    if (response.allowed!=null) {
      setAllowMessage('Permission Activated!');
    } else {
      setDenyMessage('Permission Activation failed!');
    }
    setTimeout(() => {
      setAllowMessage('');
      setDenyMessage('');
    }, 3000);
  };

  return (
    <Box sx={{ border: 1, borderRadius: 0, p: 2, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        ACTIVATE CATALOG PERMISSION POLICY
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl fullWidth>
          <FormLabel>Select Entity</FormLabel>
          <Select
            displayEmpty
            value={selectedEntity}
            onChange={handleEntityChange}
            label="Select Entity"
            sx={{ width: '100%' }}
          >
             {entities.map((entityName) => (
              <MenuItem key={entityName} value={entityName}>
                {entityName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Select Action</FormLabel>
          <Select
            displayEmpty
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
          Activate Policy
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
  );
};
