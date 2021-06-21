import './app.less'

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import Forside from './pages/forside/forside'
import SnartSlutt from './pages/snart-slutt/snart-slutt'

export interface RouteParams {
    id: string;
}

const App = (): any => {

    return (
        <StoreProvider>
            <DataFetcher>
                <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                    <Switch>
                        <Route exact={true} path="/" component={Forside} />
                        <Route path="/snart-slutt-pa-sykepengene" component={SnartSlutt} />
                    </Switch>
                </main>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
