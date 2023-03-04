import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
function CreatePost(props) {
  const { isOpen, onClose, modalBody, modalName } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{modalBody}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreatePost;
