// Imports
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GradientHeading } from "../components/GradientHeading";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Main } from "../components/Main";

// Validate username
function validateUserName(value) {
  let error;
  if (!value) {
    error = "Bitte gib einen Benutzernamen ein.";
  } else if (!/^[A-Z0-9._]{3,20}$/i.test(value)) {
    error = "Bitte gib einen gültigen Benutzernamen ein.";
  }
  return error;
}

// Validate password: only if exists and length
function validatePassword(value) {
  let error;
  if (!value) {
    error = "Bitte gib dein Passwort ein.";
  } else if (value.length < 8) {
    error = "Das Passwort hat mindestens 8 Zeichen.";
  }
  return error;
}

export default function SignupForm() {
  // Constants
  const router = useRouter(); // Use router to go to next page
  const { onClose } = useDisclosure(); // Close modal
  const [showErrorModal, setShowErrorModal] = React.useState(false); // State to open error modal

  // Password show and hide
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // Check if logged in
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/room");
    }
  }, []);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Main>
          {/* Page header */}
          <Stack align={"left"}>
            <GradientHeading fontSize="4xl" title="Anmelden" />
            <Text fontSize={"lg"} color={"gray.600"}>
              Melde dich jetzt an, um ein neues Spiel zu starten.
            </Text>
          </Stack>

          {/* Set form through Formik */}
          <Formik
            initialValues={{ username: "", password: "" }}
            // Execute submit actions
            onSubmit={async (values, actions) => {
              // Make JSON object from data
              const JSONdata = JSON.stringify(values);

              // Set submitting state to false
              actions.setSubmitting(false);

              // REST endpoint
              const endpoint =
                "https://quizlingo-backend.herokuapp.com/authenticate";

              // Build request to send data to endpoint
              const options = {
                method: "POST", // POST because sending data
                headers: {
                  "Content-Type": "application/json", // Inform server we send a JSON
                },
                body: JSONdata, // Body of the request is JSON data created above
              };

              // Send form data to REST API and get a response
              const response = await fetch(endpoint, options);

              // Check if login data correct
              if (response.status == 200) {
                // Store token globally
                const result = await response.json();
                sessionStorage.setItem("token", JSON.stringify(result.token));
                sessionStorage.setItem(
                  "username",
                  JSON.stringify(values.username)
                );

                // Redirect to room page
                router.push("/room");
              } else {
                // Else open error modal (any other response code)
                setShowErrorModal(true);
              }
            }}
          >
            {(props) => (
              <Form>
                <Stack spacing={6}>
                  {/* Username field */}
                  <Field name="username" validate={validateUserName}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <FormLabel>Benutzername</FormLabel>
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          placeholder="maxmustermann"
                          {...field}
                        />
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Password field */}
                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Passwort</FormLabel>
                        <InputGroup size="md">
                          <Input
                            id="password"
                            name="password"
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="••••••••••••••••"
                            {...field}
                          />
                          <InputRightElement width="rem">
                            <Button variant="link" onClick={handleClick}>
                              {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    mt={4}
                    type="submit"
                    size="lg"
                    variant="solid"
                    colorScheme="orange"
                    rounded="button"
                    width="full"
                    isLoading={props.isSubmitting}
                  >
                    Einloggen
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Main>
      </motion.div>

      {/* Show error modal when login data wrong */}
      <Modal isOpen={showErrorModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login fehlgeschlagen</ModalHeader>
          <ModalBody>
            <Stack spacing={3}>
              <Text>
                Deine eingegeben Daten sind nicht korrekt. Oder musst du dich
                erst registrieren?
              </Text>
              <Text>Versuche es noch einmal.</Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack direction="row" spacing={2}>
              <Button variant="ghost" onClick={() => router.push("/register")}>
                Registrieren
              </Button>
              <Button
                colorScheme="orange"
                onClick={() => setShowErrorModal(false)}
              >
                Schließen
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
