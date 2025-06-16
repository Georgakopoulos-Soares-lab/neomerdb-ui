import { Box, Typography, Container, Paper, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

import 'swiper/css';

import { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const sections = [
  {
    title: 'Nullomer Pages (Genomes & Exomes)',
    description:
      'Detailed views and filters for nullomer records across genome and exome datasets.',
    slides: [
      {
        img: '/images/nullomer_table.png',
        label: 'Data Table',
        description:
          'Explore nullomer data across genomes and exomes with powerful table features like filtering, sorting, and downloads.',
      },
      {
        img: '/images/nullomer_stats.png',
        label: 'Statistics View',
        description: 'Analyze distribution patterns and donor-based statistics.',
      },
    ],
  },
  {
    title: 'Donor Pages (Genomes & Exomes)',
    description: 'Browse and filter donor information and their associated nullomer findings.',
    slides: [
      {
        img: '/images/donor_table.png',
        label: 'Donor Table',
        description: 'Browse donor metadata and their associated nullomer findings.',
      },
      {
        img: '/images/donor_filters.png',
        label: 'Filtering Interface',
        description: 'Customize your view with advanced filtering and export tools.',
      },
    ],
  },
  {
    title: 'Patient Page',
    description:
      'Review individual donor (patient) data, nullomer findings, and personalized statistics.',
    slides: [
      {
        img: '/images/patient_overview.png',
        label: 'Overview',
        description: 'Dive into individual donor data, nullomer findings and personalized stats.',
      },
    ],
  },
  {
    title: 'Visualizations',
    description: 'Interactive charts and plots for visual exploration of nullomer and donor data.',
    slides: [
      {
        img: '/images/visualizations_chart.png',
        label: 'Data Charts',
        description:
          'Interactive charts highlighting nullomer patterns, donor groupings, and frequency distributions.',
      },
    ],
  },
  {
    title: 'Download Page',
    description: 'Export selected datasets and results for further offline analysis.',
    slides: [
      {
        img: '/images/download_center.png',
        label: 'Data Export',
        description: 'Download selected datasets for offline analysis or reuse.',
      },
    ],
  },
  {
    title: 'About & License',
    description: 'Information about NeomerDB, authorship, affiliations, and licensing.',
    slides: [
      {
        img: '/images/about_page.png',
        label: 'About NeomerDB',
        description: 'Learn about the project background, authors, and affiliations.',
      },
      {
        img: '/images/license_page.png',
        label: 'Privacy & License',
        description: 'Understand data usage rights and license agreements.',
      },
    ],
  },
];

const HelpPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>();

  console.log(swiperInstance?.isBeginning, swiperInstance?.isEnd);

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
            <SwiperSlide key={label}>
              <Paper elevation={3} sx={{ p: 2, m: 2, cursor: 'pointer' }}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <IconButton
                    className="custom-swiper-button-prev"
                    sx={{ visibility: swiperInstance?.isBeginning ? 'hidden' : 'visible' }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <Box
                    component={'img'}
                    src={img}
                    alt={label}
                    style={{
                      width: '80%',
                      maxWidth: 600,
                      margin: '0 auto',
                      display: 'block',
                      borderRadius: 8,
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
      </Box>
    </Container>
  );
};

export default HelpPage;
