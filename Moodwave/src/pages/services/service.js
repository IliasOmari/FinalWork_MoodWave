export async function getProfileData() {
  if (localStorage.getItem("id")) {
    const res = await fetch("http://localhost:3000/profile", {
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
    const res = await fetch("http://localhost:3000/auth/google/success", {
      credentials: "include",
    });
    const data = await res.json();

    if (data.status == "Bad Request") return null;
    return data;
  }
}
