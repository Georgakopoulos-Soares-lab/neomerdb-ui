import { Box, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { Link, CheckCircle } from '@mui/icons-material';

const ShareLink = () => {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      const fullUrl = `${globalThis.location.origin}${router.state.location.href}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Tooltip title={copied ? 'Copied!' : 'Copy link'}>
        <IconButton onClick={handleCopy} size="small">
          {copied ? (
            <CheckCircle
              color="primary"
              fontSize="small"
              sx={{ transition: 'transform 0.3s', transform: 'scale(1.2)' }}
            />
          ) : (
            <Link color="primary" fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ShareLink;
