import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';

const Products = ({ match }) => (
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/products`} />
      <Route path={`${match.url}/category`} component={lazy(() => import(`./category`))} /> 
    </Switch>
  </Suspense>
);

export default Products;