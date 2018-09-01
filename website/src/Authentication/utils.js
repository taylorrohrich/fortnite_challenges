import netlifyIdentity from "netlify-identity-widget";

export const loginUser = () => {
  if (netlifyIdentity && netlifyIdentity.currentUser()) {
    const {
      app_metadata,
      created_at,
      confirmed_at,
      email,
      id,
      user_metadata
    } = netlifyIdentity.currentUser();

    localStorage.setItem(
      "currentOpenSaucedUser",
      JSON.stringify({
        ...app_metadata,
        created_at,
        confirmed_at,
        email,
        id,
        ...user_metadata
      })
    );
  }
};

export const logoutUser = () => {
  localStorage.removeItem("currentOpenSaucedUser");
};
