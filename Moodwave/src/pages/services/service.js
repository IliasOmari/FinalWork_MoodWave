export async function getProfileData() {
  if (localStorage.getItem("id")) {
    const res = await fetch("https://finalwork-moodwave-api.onrender.com/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: localStorage.getItem("id") }),
    });
    const data = await res.json();
    if (data.status == "Bad Request") return null;
    return data;
  } else {
    const res = await fetch("https://finalwork-moodwave-api.onrender.com/auth/google/success", {
      credentials: "include",
    });
    const data = await res.json();

    if (data.status == "Bad Request") return null;
    return data;
  }
}
