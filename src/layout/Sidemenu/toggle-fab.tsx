import { Fab } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const ToggleFab = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
  <Fab
    size="small"
    color={isOpen ? 'secondary' : 'primary'}
    sx={{
      position: 'absolute',
      top: '50vh',
      right: 0,
      transform: 'translate(50%, -50%)',
      transition: 'all 0.3s',
    }}
    onClick={toggle}
  >
    {isOpen ? <ChevronLeft /> : <ChevronRight />}
  </Fab>
);

export default ToggleFab;
