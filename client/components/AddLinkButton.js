import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@apollo/client";
import { ADD_LINK } from "../mutations/linkMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import Modal from "./Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from 'next/router';

export default function AddLinkButton({ project }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ active: false });

  const [addLink, { error }] = useMutation(ADD_LINK, {
    variables: {
      project: project.id,
      name: formData.name,
      url: formData.url,
      active: formData.active,
    },
    onCompleted: () => {
      // console.log("link added");
      toast.success("Link added");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
    onError(error) {
      console.log(error);
    } 
  });

  useEffect(() => {
    if (error) {
      Router.push('/error?message=' + error.message);
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    addLink();
    setShowModal(false);
  };

  return (
    <div>
      <PlusIcon
        title="Add link to Project"
        className="h-6 w-6 transform hover:scale-110 text-white cursor-pointer"
        onClick={() => setShowModal(true)}
      />
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div className="flex flex-col opacity-100">
          <h1 className="text-2xl font-bold">Add Link</h1>
          <form onSubmit={handleModalSubmit} className="p-2">
            <div className="flex items-center space-x-2 justify-between">
              <label>
                Link Name
                <input
                  type="text"
                  placeholder="Cool dashboard 1"
                  className="p-1 my-2 outline-none border rounded-md"
                  name="name"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <label>URL: </label>
              <input
                type="text"
                placeholder="http://www.link.com"
                className="p-1 my-2 outline-none border rounded-md"
                name="url"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="active">Active?</label>
              <input
                name="active"
                type="checkbox"
                checked={formData.active}
                onChange={handleCheckbox}
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-blue-500 text-white py-1 px-2 my-2 hover:bg-blue-600"
            >
              Add Link
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
