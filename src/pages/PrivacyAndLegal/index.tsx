import {
  Box,
  Container,
  Typography,
  Link,
  List,
  ListItem,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Privacy = () => (
  <Container>
    <Box sx={{ mt: 4, mb: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Privacy Policy
          </Typography>

          <Box textAlign="center" mb={3}>
            <Link
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              View NeomerDB CC BY-SA 4.0 License
            </Link>
          </Box>

          <Typography paragraph>
            The administrators of NeomerDB provide the following privacy notice to explain what
            personal data is collected, for what purposes, how it is processed and how we keep it
            secure.
          </Typography>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                1. Who controls your personal data and how to contact us?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                All data are collected and processed by the administrators of the NeomerDB database.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                2. What is the lawful basis for data collection?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Data are collected to help monitor website functionality, resolve issues, improve
                the allocated resources and provide services to you adequately.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                3. What personal data is collected from users?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                The personal data collected by the website’s services are as follows:
              </Typography>
              <List dense component="ol">
                {[
                  'IP address',
                  'Date and time of a visit to the service',
                  'Operating System',
                  'Browser',
                  'Amount of data transmitted',
                ].map((item, index) => (
                  <ListItem key={index} component="li" sx={{ pl: 4 }}>
                    <Typography>{`${index + 1}. ${item}`}</Typography>
                  </ListItem>
                ))}
              </List>
              <Typography paragraph>
                The data administrators use the aforementioned data for the following:
              </Typography>
              <List dense component="ol">
                {[
                  'To provide the user access to the service',
                  'To conduct and monitor data protection activities',
                  'To conduct and monitor website security',
                  'To better understand user needs and guide future improvements',
                  'To communicate with users and answer their questions',
                ].map((item, index) => (
                  <ListItem key={index} component="li" sx={{ pl: 4 }}>
                    <Typography>{`${index + 1}. ${item}`}</Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                4. Who has access to your personal data?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Any collected personal data is solely accessed and controlled by the website’s
                administrators (see question 1). No other person has access to the data.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                5. Will your personal data be transferred to other organisations?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Any personal data directly collected by NeomerDB’s services are handled by the
                administrators of NeomerDB exclusively.{' '}
                <strong>
                  There are no transfers to any other organisations whatsoever for these data.
                </strong>
              </Typography>
              <Typography paragraph>
                Please note that NeomerDB utilizes a number of third-party resources to provide you
                with the best possible experience. These include:
              </Typography>
              <List dense>
                {[
                  ['jQuery', 'https://jquery.com/'],
                  ['FontAwesome', 'https://fontawesome.com/'],
                  ['Bootstrap 5 DataTables', 'https://datatables.net/examples/styling/bootstrap5'],
                  ['Chart.js', 'https://www.chartjs.org/'],
                ].map(([label, url], index) => (
                  <ListItem key={index} sx={{ pl: 4 }}>
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      {label}
                    </Link>
                  </ListItem>
                ))}
              </List>
              <Typography paragraph>
                These services may store cookies and record data. NeomerDB administrators are{' '}
                <strong>not</strong> responsible for their data handling. Consult their Privacy
                Policies.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                6. How long is your personal data kept?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Any personal data directly obtained from you will be retained for the minimum amount
                of time possible to ensure legal compliance and facilitate audits if needed.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                7. Cookies Policy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                NeomerDB uses cookies to achieve functionality and provide you with the best
                possible experience:
              </Typography>
              <List dense>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary="Functionality" />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary="Security" />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText primary="Cookie consent" />
                </ListItem>
              </List>
              <Typography paragraph>Guides to manage cookies by browser:</Typography>
              <List dense>
                {[
                  ['Google Chrome', 'https://support.google.com/chrome/answer/95647?hl=en'],
                  [
                    'Mozilla Firefox',
                    'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences',
                  ],
                  ['Opera', 'https://help.opera.com/en/latest/web-preferences/'],
                  [
                    'Microsoft IE',
                    'https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies',
                  ],
                  [
                    'Apple Safari',
                    'https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac',
                  ],
                  [
                    'Microsoft Edge',
                    'https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy',
                  ],
                ].map(([label, url], index) => (
                  <ListItem key={index} sx={{ pl: 4 }}>
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      {label}
                    </Link>
                  </ListItem>
                ))}
              </List>
              <Typography paragraph>
                Blocking <strong>all</strong> cookies may negatively affect usability.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="bold">
                8. Your rights regarding personal data
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>You have the right to:</Typography>
              <List dense component="ol">
                {[
                  'Not be subject to automated decisions without human intervention.',
                  'Request information about your processed personal data.',
                  'Request details on data processing activities applied to you.',
                  'Object to data processing unless we have legitimate reasons.',
                  'Request rectification or erasure if processing violates policies.',
                ].map((item, index) => (
                  <ListItem key={index} component="li" sx={{ pl: 4 }}>
                    <Typography>{`${index + 1}. ${item}`}</Typography>
                  </ListItem>
                ))}
              </List>
              <Typography paragraph>Exceptions when processing is necessary to:</Typography>
              <List dense component="ol">
                {[
                  'Comply with a legal obligation',
                  'Perform a public interest task',
                  'Exercise data controller authority',
                  'Archive for research or statistics',
                  'Establish or defend legal claims',
                ].map((item, index) => (
                  <ListItem key={index} component="li" sx={{ pl: 4 }}>
                    <Typography>{`${index + 1}. ${item}`}</Typography>
                  </ListItem>
                ))}
              </List>
              <Typography paragraph>
                Any requests and objections can be sent to us through the{' '}
                <Link href="/about" underline="hover">
                  About
                </Link>{' '}
                page.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Container>
    </Box>

    <Box id="license" sx={{ mt: 4, mb: 4 }}>
      <Container maxWidth="md">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" fontWeight="bold" align="center">
              License & Disclaimer
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              We have chosen to apply the Creative Commons 4.0 BY-SA license to NeomerDB. More info
              at{' '}
              <Link
                component={'a'}
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                creativecommons.org/licenses/by-sa/4.0
              </Link>
              .
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              You are free to:
            </Typography>
            <List dense component="ol">
              {[
                'Share — copy and redistribute the material in any medium or format for any purpose, even commercially.',
                'Adapt — remix, transform, and build upon the material for any purpose, even commercially.',
              ].map((item, index) => (
                <ListItem key={index} component="li" sx={{ pl: 4 }}>
                  <Typography>{`${index + 1}. ${item}`}</Typography>
                </ListItem>
              ))}
            </List>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Under the following terms:
            </Typography>
            <List dense component="ol">
              {[
                'Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made.',
                'ShareAlike — You must distribute your contributions under the same license as the original.',
                'No additional restrictions — You may not apply legal terms or technological measures that restrict others.',
              ].map((item, index) => (
                <ListItem key={index} component="li" sx={{ pl: 4 }}>
                  <Typography>{`${index + 1}. ${item}`}</Typography>
                </ListItem>
              ))}
            </List>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Disclaimer
            </Typography>
            <List dense component="ol">
              {[
                'We make no warranties regarding the correctness of the data.',
                'We cannot guarantee rights to all datasets due to possible patents.',
                'NeomerDB is for research and informational use only, not medical advice.',
              ].map((item, index) => (
                <ListItem key={index} component="li" sx={{ pl: 4 }}>
                  <Typography>{`${index + 1}. ${item}`}</Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  </Container>
);

export default Privacy;
