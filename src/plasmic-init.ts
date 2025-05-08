import { initPlasmicLoader } from "@plasmicapp/loader-react";
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "4r4EJCXGvA6RbZbKUbQkGC",  // ID of a project you are using
      token: "y214YHIyErHv9trHfS58h2YZlOuJ1TUi7mDoDuGiv3bVmQnUpKboCbKShuZC8CDCxKxRUELgLKI9uPhWhcQ"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})