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
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  UnorderedList,
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

// Validate name: criteria see list component below
function validateName(value) {
  let error;
  if (!value) {
    error = "Bitte gib deinen Vornamen ein.";
  } else if (!/^[A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF]{3,20}$/i.test(value)) {
    error = "Bitte gib einen gültigen Vornamen ein.";
  }
  return error;
}

// Validate password: criteria see list component blow
function validatePassword(value) {
  let error;
  if (!value) {
    error = "Bitte gib ein Passwort ein.";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
      value
    )
  ) {
    error = "Bitte gib ein gültiges Passwort ein.";
  }
  return error;
}

export default function RegisterForm() {
  // Constants
  const router = useRouter(); // Use router to go to next page
  const { onClose } = useDisclosure(); // Close modal
  const [showErrorModal, setShowErrorModal] = React.useState(false); // State to open error modal
  const [showSuccessModal, setShowSuccessModal] = React.useState(false); // State to open success modal

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
            <GradientHeading fontSize="4xl" title="Registrieren" />
            <Text fontSize={"lg"} color={"gray.600"}>
              Erstelle jetzt ein Konto, um ein Spanisch-Quiz zu starten!
            </Text>
          </Stack>

          {/* Set form through Formik */}
          <Formik
            initialValues={{
              name: "",
              username: "",
              password: "",
              imageURL: null,
            }}
            // Execute submit actions
            onSubmit={async (values, actions) => {
              // Make JSON object from data
              const JSONdata = JSON.stringify(values);

              // Set submitting state to false
              actions.setSubmitting(false);

              // REST endpoint
              const endpoint =
                "https://quizlingo-backend.herokuapp.com/register";

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

              // Check if user alredy exists
              if (response.status == 200) {
                // Open success modal if code equals 200 (new user can be created)
                setShowSuccessModal(true);
              } else {
                // Else open error modal (any other response code)
                setShowErrorModal(true);
              }
            }}
          >
            {(props) => (
              <Form>
                <Stack spacing={6}>
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        // Check if input has errors and is touched
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel>Vorname</FormLabel>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Max"
                          {...field}
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="username" validate={validateUserName}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        // Check if input has errors and is touched
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
                        <UnorderedList spacing={2} mt={4}>
                          <ListItem>Mindestens 3, maximal 20 Zeichen</ListItem>
                          <ListItem>
                            Keine Sonderzeichen, außer <Text as="samp">._</Text>
                          </ListItem>
                        </UnorderedList>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        // Check if input has errors and is touched
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
                          <InputRightElement>
                            <Button variant="link" onClick={handleClick}>
                              {show ? <ViewOffIcon /> : <ViewIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                        <UnorderedList spacing={2} my={4}>
                          <ListItem>Mindestens 8 Zeichen</ListItem>
                          <ListItem>
                            Mindestens 1 Großbuchstabe, 1 Kleinbuchstabe, 1
                            Sonderzeichen <Text as="samp">@$!%*?&</Text>
                          </ListItem>
                        </UnorderedList>
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
                    Registrieren
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Main>
      </motion.div>

      <Modal isOpen={showErrorModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrierung fehlgeschlagen</ModalHeader>
          <ModalBody>
            <Stack spacing={3}>
              <Text>
                Der Benutzername ist bereits vorhanden, oder es ist ein
                technischer Fehler aufgetreten.
              </Text>
              <Text>
                Verwende einen anderen Benutzernamen oder versuche es später
                noch einmal.
              </Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={0}
              onClick={() => setShowErrorModal(false)}
            >
              Schließen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={showSuccessModal} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registrierung erfolgreich</ModalHeader>
          <ModalBody>
            <Stack spacing={3}>
              <Text>Dein Konto bei Quizlingo wurde hinzugefügt!</Text>
              <Text>Du kannst dich jetzt einloggen.</Text>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={0}
              onClick={() => router.push("/login")}
            >
              Einloggen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
