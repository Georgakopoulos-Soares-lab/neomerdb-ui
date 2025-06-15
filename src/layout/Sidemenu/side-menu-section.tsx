import { ListItemButton, ListItemText, Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';

interface SideMenuSectionProperties {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  items: { label: string; to: string }[];
  visible: boolean;
}

const SideMenuSection = ({ title, isOpen, toggle, items, visible }: SideMenuSectionProperties) => {
  return (
    <>
      <ListItemButton onClick={toggle}>
        <ListItemText
          primary={title}
          primaryTypographyProps={{ fontWeight: 'bold' }}
          sx={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map(({ label, to }) => (
            <ListItemButton component={Link} to={to} key={to}>
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
        </List>
      </Collapse>
    </>
  );
};

export default SideMenuSection;
