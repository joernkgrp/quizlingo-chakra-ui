import React, { useState } from "react";
import { useRouter } from "next/router";
import { Field, Form, Formik } from 'formik';
import { Button, Container, FormControl, FormHelperText, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { GradientHeading } from "../components/GradientHeading";
import { Main } from '../components/Main';

// Define error messages
function validateEmail(value) {
  let error
  if (!value) {
    error = 'Bitte gib eine E-Mail-Adresse ein.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Bitte gib eine gültige E-Mail-Adresse ein.';
  }
  return error
}

function validatePassword(value) {
  let error
  if (!value) {
    error = 'Bitte gib dein Passwort ein.';
  } else if (value.length < 8) {
    error = 'Dein Passwort hat mindestens 8 Zeichen.';
  }
  return error
}

export default function SignupForm() {
  // Use router to go to next page
  const router = useRouter();

  // Password show and hide
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container>
      <Main>
        <Stack align={"left"}>
          <GradientHeading fontSize="4xl" title="Anmelden" />
          <Text fontSize={"lg"} color={"gray.600"}>
            Melde dich jetzt an, um ein neues Spiel zu starten.
          </Text>
        </Stack>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2))
              actions.setSubmitting(false)
              router.push("/load")
            }, 1000)
          }}
        >
          {(props) => (
            <Form>
              <Stack spacing={6}>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel>E-Mail-Adresse</FormLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="max.mustemann@mail.de"
                        {...field}
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => (
                    <FormControl isRequired isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel>Passwort</FormLabel>
                      <InputGroup size='md'>
                        <Input
                          id="password"
                          name="password"
                          pr='4.5rem'
                          type={show ? 'text' : 'password'}
                          placeholder='••••••••••••••••'
                          {...field}
                        />
                        <InputRightElement width='4.5rem'>
                          <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button mt={4}
                  type='submit'
                  size="lg"
                  variant="solid"
                  colorScheme="orange"
                  rounded="button"
                  width="full"
                  isLoading={props.isSubmitting}
                >
                  Einloggen</Button>

              </Stack>
            </Form>

          )}
        </Formik>
      </Main>
    </Container>
  );
};