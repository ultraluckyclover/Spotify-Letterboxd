


export const logout = () => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.location.reload();

    window.location.hash = '';

    // Reload the page to reflect the changes
    window.location.reload();
  };