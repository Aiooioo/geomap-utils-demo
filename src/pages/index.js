import { useRef, useEffect } from 'react';
import { connect } from 'dva';

import styles from './index.css';

export default connect()(function({ dispatch }) {
  const domDiv = useRef(null);

  useEffect(() => {
    if (domDiv.current) {
      dispatch({
        type: 'init-map',
        payload: {
          container: domDiv.current,
        },
      });
    }
  }, [dispatch]);

  return <div ref={domDiv} className={styles.normal} />;
});
