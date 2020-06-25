import React from 'react'
import { PageLayout } from '../PageLayout'
import Form from 'carbon-components-react/lib/components/Form'
import FormGroup from 'carbon-components-react/lib/components/FormGroup'
import TextInput from 'carbon-components-react/lib/components/TextInput'

export const SignUpPage = () => (
  <PageLayout title="Sign Up" submitButtonTitle="Continue">
    <Form style={{ width: "100%" }}>
      <FormGroup>
        <TextInput
          id="first_name"
          invalidText="Invalid error message."
          labelText="First Name"
          placeholder="Joan"
        />
      </FormGroup>
      <FormGroup>
        <TextInput
          id="last_name"
          invalidText="Invalid error message."
          labelText="Last Name"
          placeholder="Ambassador"
        />
      </FormGroup>
      <FormGroup>
        <TextInput
          id="last_name"
          invalidText="Invalid error message."
          labelText="Date of Birth"
          placeholder="mm/dd/yyyy"
        />
      </FormGroup>
    </Form>
  </PageLayout>
)
