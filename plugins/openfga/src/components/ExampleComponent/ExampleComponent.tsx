import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  HeaderLabel,
} from '@backstage/core-components';
// import { ExampleFetchComponent } from '../ExampleFetchComponent';
import { OpenfgaCatalogComponent } from '../OpenfgaCatalogComponent';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header title="OpenFGA Permission">
    </Header>
    <Content>
      <Grid container>
        <Grid item>
          <OpenfgaCatalogComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
