const uploadImage = async (file) => {
  if (file) {
    const fData = new FormData();
    fData.append("image", file);
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=2bca849f6f65e90a8e64dfaef112667f",
      {
        method: "POST",
        body: fData,
      }
    );
    const data = await response.json();
    return data?.data?.url;
  }
};

export default uploadImage;
