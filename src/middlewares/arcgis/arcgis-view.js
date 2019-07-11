import agsUtils from '@geomap/utils';

const ags = {};

function createMapView(opts = {}) {
  // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
  if (opts.getState && opts.dispatch) {
    return () => next => action => next(action);
  }

  return store => next => async action => {
    switch (action.type) {
      case 'init-map': {
        const { payload } = action;
        const { container } = payload;

        // DOM container not defined
        if (!container) break;

        // if sceneview container is already initialized, just add it back to the DOM.
        if (ags.container) {
          container.appendChild(ags.container);
          break;
        }

        const [EsriMap, MapView] = await agsUtils.jsapi.load(['esri/Map', 'esri/views/MapView']);
        const map = new EsriMap({
          basemap: 'osm',
        });
        const view = new MapView({
          container: container,
          map,
        });
        break;
      }
      default: {
        next(action);
        break;
      }
    }
    return Promise.resolve();
  };
}

export { createMapView };
