import React from "react";

function ShareOptions({ postUrl, onClose }) {
  console.log(postUrl)
  function handleShare(platform) {
    let sharedUrl = "";

    switch (platform) {
      case "whatsapp":
        sharedUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          postUrl
        )}`;
        break;
      case "facebook":
        sharedUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          postUrl
        )}`;
        break;
    }

    window.open(sharedUrl);
    onClose();
  }

  return (
    <div className="px-3 py-2 flex items-center gap-2">
      <div onClick={() => handleShare("whatsapp")}>
        <img
          width={"50px"}
          src="https://img.freepik.com/premium-vector/whatsapp-icon-design_23-2147900928.jpg?semt=ais_hybrid"
          alt=""
        />
        <button className="mr-4">Whatsapp</button>
      </div>
      <div onClick={() => handleShare("facebook")}>
        <img
          width={"50px"}
          src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png"
          alt=""
        />
        <button>Facebook</button>
      </div>
      <button className="block text-red-500" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default ShareOptions;
