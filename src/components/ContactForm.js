import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';
import { amber, green } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';


const variantIcon = {
  success: CheckCircle,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}))

const ContactForm = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = React.useState({
    name: false,
    email: false,
    subject: false,
    message: false
  })
  const [status, setSentStatus] = React.useState(false)

  const inputHandler = evt => {
    const type = evt.target.name;
    const value = evt.target.value
    if (type === 'message' && value.length >= 500) return setErrors({ ...errors, message: true })
    setValues({ ...values, [type]: value })
    setErrors({
      ...errors, [type]: !Boolean(value)
    })
  }

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (errors.name || errors.email || errors.subject || errors.message) return;
    fetch('https://p8d2w8tkz4.execute-api.us-east-1.amazonaws.com/send-email/submit', {
      method: 'POST',
      body: JSON.stringify({
        name: values.name,
        sender: values.email,
        subject: values.subject,
        body: values.message
      })
    })
      .then(res => res.json())
      .then(data => {
        setErrors({
          name: false,
          email: false,
          subject: false,
          message: false
        })
        setValues({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setSentStatus( true)
        console.log('Successfully Sent: ', data)
      })
      .catch(err => console.error('Failed to send: ', err))
    // setSentStatus( true)
  }

  const handleClose = (event, reason) => {
    console.log( reason );
    if (reason === 'clickaway') {
      return;
    }
    setSentStatus(false);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} className={classes.container}>
        <Grid item xs={12}>
          <h1>Contact Form</h1>
        </Grid>
        <Grid container spacing={1}>
          <Grid item sm={6}>
            <TextField
              required
              fullWidth
              label="Full Name"
              name="name"
              value={values.name}
              onChange={inputHandler}
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              required
              fullWidth
              id="outlined-email-input"
              label="Email"
              error={errors.email}
              type="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              value={values.email}
              onChange={inputHandler}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Subject"
            error={errors.subject}
            name="subject"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            value={values.subject}
            onChange={inputHandler}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Message"
            fullWidth
            multiline
            required={errors.message}
            rows="5"
            name="message"
            value={values.message}
            onChange={inputHandler}
            helperText={errors.message ? 'Please input message ( up to 500 characters )' : ''}
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <Snackbar
          open={status}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant="success"
            message="Message successfully sent!"
          />
        </Snackbar>

        <Grid item xs={12}>

          <Button variant="contained" type="submit">
            Send Message
            </Button>

        </Grid>
      </form>
    </Container>
  )
}

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      message={
        <span>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}
export default ContactForm;