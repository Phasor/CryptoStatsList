import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@apollo/client";
import { DELETE_LINK } from "../mutations/linkMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function DeleteLinkButton({ link }) {
  const [displayError, setDisplayError] = useState(null);

  const [deleteLink] = useMutation(DELETE_LINK, {
    variables: { id: link.id },
    onCompleted: () => {
      console.log("link deleted");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    context: {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    },
  });

  return (
    <div>
      <TrashIcon
        className="h-4 w-4 transform hover:scale-110 text-black "
        onClick={deleteLink}
      />
      {displayError && <p>{displayError.message}</p>}
    </div>
  );
}
