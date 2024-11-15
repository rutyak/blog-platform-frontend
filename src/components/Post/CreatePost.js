import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Base_url = process.env.REACT_APP_BACKEND_URL;

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { userData } = useAuth();
  console.log("userData from context::::", userData);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!userData || !userData._id) {
      toast.error("You need to be logged in to create a post.");
      return;
    }

    console.log("Sending Data:", {
      title,
      content,
      authorId: String(userData._id),
    });

    const obj = { title, content, authorId: String(userData._id) };

    try {
      const res = await axios.post(`${Base_url}/create/post`, obj);
      console.log("Response:", res);

      setIsModalOpen(false);
      if (res.status === 201) {
        navigate("/dashboard");
        toast.success("Post created successfully!");
      }
    } catch (error) {
      console.error("Error creating post:", error.response || error.message);
      toast.error("Failed to create post.");
    }
  };

  // Open modal
  const openModal = () => {
    if (!userData || !userData._id) {
      toast.error("You need to be logged in to create a post.");
      return;
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Disable button if user is not authenticated */}
      <Button
        onClick={openModal}
        variant="contained"
        color="primary"
        disabled={!userData || !userData._id}
      >
        Create Post
      </Button>

      {/* Modal for creating post */}
      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle>Create a New Blog Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              required
              multiline
              rows={4}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreatePost;
