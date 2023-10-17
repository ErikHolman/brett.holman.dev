import { makeStyles } from '@material-ui/styles';
import { Grid } from '@mui/material';
import { CenterStatusBar, LeftStatusBar, RightStatusBar } from './statusBar';
import { SessionState } from '../models/sessionState';

const useStyles = makeStyles({
  footer: {
    marginTop: '1rem',
    padding: '1rem',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface FooterProps {
  sessionState: SessionState;
  updateSessionState: (_: Partial<SessionState>) => void;
}

export const Footer = ({ sessionState, updateSessionState }: FooterProps) => {
  const classes = useStyles();

  const width = window.innerWidth;
  const isMobile = width <= 768;

  return (
    <div className={classes.footer}>
      <LeftStatusBar
        sessionName='portfolio'
        tabPosition={1}
        panePosition={0}
        isMobile={isMobile}
      />
      <CenterStatusBar
        sessionState={sessionState}
        updateSessionState={updateSessionState}
      />
      <RightStatusBar isMobile={isMobile} />
    </div>
  );
};
