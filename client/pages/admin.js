import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import ProjectRow from "../components/ProjectRow";
import NavBar from "../components/NavBar";
import AddProjectButton from "../components/AddProjectButton";

export default function admin() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (error) return <p>Something went wrong</p>;
  if (loading) return <Spinner />;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="bg-[#F9F8F8] w-screen h-screen">
          <NavBar />
          <div className="w-screen flex justify-center bg-[#F9F8F8]">
            <div className="flex flex-col">
              {/* Add new project button */}
              <AddProjectButton />

              {/* List of existing projects */}
              <table className="table-auto  max-w-[70%] whitespace-nowrap">
                <thead className="border-t border-b border-gray-300 rounded">
                  <tr className="font-medium text-right">
                    <td className="p-3 text-center text-white">.</td>
                    <td className="p-3 text-center">Logo</td>
                    <td className="p-3">Symbol</td>
                    <td className="p-3">Project Name</td>
                    <td className="p-3">Website</td>
                    <td className="p-3"># Links</td>
                  </tr>
                </thead>
                <tbody>
                  {data.projects.map((project) => {
                    return (
                      <ProjectRow
                        key={project.id}
                        project={project}
                        admin={true}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
