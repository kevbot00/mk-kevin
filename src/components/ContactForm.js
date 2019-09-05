import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

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

  const inputHandler = evt => {
    const type = evt.target.name;
    const value = evt.target.value
    if (type === 'message' && value.length >= 500) return setErrors({ ...errors, message: true })
    setValues({ ...values, [type]: value })
    setErrors({...errors,[type]: !Boolean(value) 
    })
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    for ( let type in errors ){
      setErrors({...errors, [type]: !Boolean(values.type)})
    }
    console.log( 'submitted')
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
              // error={errors.name}
              // helperText={errors.name ? 'Please fill out your name' : ''}
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
              // error={errors.email}
              // helperText={errors.email ? 'Please fill out your email' : ''}
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
            // error={errors.subject}
            // helperText={errors.subject ? 'Please fill out the subject' : ''}
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

        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Send Message
            </Button>

        </Grid>
      </form>
    </Container>
  )
}
export default ContactForm;