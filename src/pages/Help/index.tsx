import { Box, Typography, Container, Paper, IconButton, Dialog } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';

import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { HELP_PAGE_SECTIONS } from '../../constants';

const HelpPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState('');

  

  const sections = HELP_PAGE_SECTIONS;

  const selectedSection = sections[Number(selectedTab)];
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Help & Guide
      </Typography>
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 4 }}
      >
        {sections.map((section) => (
          <Tab key={section.title} label={section.title} />
        ))}
      </Tabs>
      <Box>
        <Typography variant="h5" gutterBottom>
          {selectedSection.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {selectedSection.description}
        </Typography>
        <Swiper
          key={selectedTab}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            setSwiperInstance({ ...swiper });
          }}
          onSlideChange={(swiper) => {
            setSwiperInstance({ ...swiper });
          }}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
          }}
        >
          {selectedSection.slides.map(({ img, label, description }) => (
            <SwiperSlide>
              <Paper elevation={3} sx={{ p: 2, m: 2, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <IconButton
                    className="custom-swiper-button-prev"
                    sx={{ visibility: swiperInstance?.isBeginning ? 'hidden' : 'visible' }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <Box
                    onClick={() => {
                      setDialogImage(img);
                      setOpenDialog(true);
                    }}
                    sx={{ cursor: 'zoom-in', width: '600px', margin: '0 auto' }}
                  >
                    <Box
                      component={'img'}
                      src={img}
                      alt={label}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 8,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                      ref={(element: HTMLImageElement | null) => {
                        if (element) {
                          const errorHandler = () => {
                            element.src = 'https://placehold.co/600x400';
                            element.removeEventListener('error', errorHandler);
                          };
                          element.addEventListener('error', errorHandler);
                        }
                      }}
                    />
                  </Box>
                  <IconButton
                    className="custom-swiper-button-next"
                    sx={{ visibility: swiperInstance?.isEnd ? 'hidden' : 'visible' }}
                  >
                    <ChevronRight />
                  </IconButton>
                </Box>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg">
          <Box
            component="img"
            src={dialogImage}
            alt="Expanded"
            sx={{
              width: '100%',
              height: 'auto',
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              p: 2,
            }}
          />
        </Dialog>
      </Box>
    </Container>
  );
};

export default HelpPage;
