import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({ history }) => {
  useEffect(() => {
    history.listen(() => {
      window.scrollTo(0, 0);
    });
  }, [history]);
  return null;
};

export default withRouter(ScrollToTop);
