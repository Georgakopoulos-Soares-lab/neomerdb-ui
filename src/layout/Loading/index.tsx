import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Box } from '@mui/material';

const Loading = () => {
  return (
    <Box
      position={'absolute'}
      top={0}
      left={0}
      width={'100%'}
      height={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backgroundImage:
          'radial-gradient( circle farthest-corner at 18.7% 37.8%,  rgba(250,250,250,0.8) 0%, rgba(225,234,238,0.9) 90% );',
        backdropFilter: 'blur(12px)',
        zIndex: 1,
      }}
    >
      <DotLottieReact
        src="/lotties/spinner-2.lottie"
        autoplay
        loop
        style={{
          width: 150,
          height: 150,
          borderRadius: 1000,
          backdropFilter: 'blur(12px)',
          overflow: 'clip',
        }}
      />
    </Box>
  );
};

export default Loading;
