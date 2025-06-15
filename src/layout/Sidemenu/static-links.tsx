import { ListItemButton, ListItemText, Divider } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { LayoutContext } from '../../context/layout/context';
import { useContext } from 'react';

const StaticLinks = ({ visible }: { visible: boolean }) => {
  const { isMobile } = useContext(LayoutContext);

  const staticLinks = [
    { label: 'Visualizations', to: '/visualizations' },
    { label: 'Download Dataset', to: '/downloads' },
    { label: 'Privacy & License', to: '/privacy' },
  ];

  if (isMobile) {
    staticLinks.push({ label: 'Help', to: '/help' }, { label: 'About', to: '/about' });
  }

  return (
    <>
      {staticLinks.map(({ label, to }) => (
        <ListItemButton key={to} component={Link} to={to}>
          <ListItemText
            primary={label}
            sx={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          />
        </ListItemButton>
      ))}
      <Divider sx={{ my: 1 }} />
    </>
  );
};

export default StaticLinks;
