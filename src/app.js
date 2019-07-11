import { createMapView } from './middlewares/arcgis/arcgis-view';

export const dva = {
  config: {
    onAction: [createMapView()],
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
