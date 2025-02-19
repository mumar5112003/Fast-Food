import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import CategorySuccessMessage from "./CategorySuccessMessage";
import CategoryFailedPopup from "./CategoryFailedPopup";
import API from "../services/api";

const AddCategoryModal = ({ show, handleClose, navigate }) => {
  const [formData, setFormData] = useState({
    adminCategory: "",
    items: "",
    description: "",
    image: null,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.adminCategory ||
      !formData.items ||
      !formData.description ||
      !formData.image
    ) {
      console.error("Please fill in all the fields");
      return;
    }

    const data = new FormData();
    data.append("image", formData.image);
    data.append("adminCategory", formData.adminCategory);
    data.append("items", formData.items);
    data.append("description", formData.description);

    try {
      const response = await API.post(`/menu/categories/upload`, data);

      // Check if the response indicates success
      if (response.data.success) {
        // Show the success message
        setShowSuccessMessage(true);

        // Close the modal after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
          handleClose(); // Close the modal
          // Optionally, you can reset the form values here if needed
          setFormData({
            adminCategory: "",
            items: "",
            description: "",
            image: null,
          });
        }, 3000);
      } else {
        // Show the error popup
        setShowFailedPopup(true);

        // Close the failed popup after 3 seconds
        setTimeout(() => {
          setShowFailedPopup(false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);

      // Show the error popup
      setShowFailedPopup(true);

      // Close the failed popup after 3 seconds
      setTimeout(() => {
        setShowFailedPopup(false);
      }, 3000);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="adminCategory">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="adminCategory"
                placeholder="Enter category name"
                onChange={handleChange}
                required // Add required attribute
              />
            </Form.Group>

            <Form.Group controlId="items">
              <Form.Label>Some Items Name</Form.Label>
              <Form.Control
                type="text"
                name="items"
                placeholder="Enter some items name, separated by commas"
                onChange={handleChange}
                required // Add required attribute
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                placeholder="Enter category description"
                onChange={handleChange}
                required // Add required attribute
              />
            </Form.Group>

            <Form.Group controlId="imageUpload">
              <Form.Label>Image Upload</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required // Add required attribute
              />
            </Form.Group>

            <Button type="submit" className="btn btn-dark mt-2">
              Save Category
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Show the success message component */}
      {showSuccessMessage && (
        <CategorySuccessMessage
          categoryName={formData.adminCategory}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}

      {/* Show the failed popup component */}
      {showFailedPopup && (
        <CategoryFailedPopup onClose={() => setShowFailedPopup(false)} />
      )}
    </>
  );
};

export default AddCategoryModal;
