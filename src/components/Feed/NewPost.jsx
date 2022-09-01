import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { BsEmojiSunglasses, BsFillCheckCircleFill } from "react-icons/bs";
import { FcCamcorderPro, FcImageFile } from "react-icons/fc";
import { IoCloseSharp, IoSend } from "react-icons/io5";
import { useStateValue } from "../../contexts/StateProvider";
import { firestore } from "../../firebase";

const NewPost = () => {
  const [{ user }, dispatch] = useStateValue();
  const [post, setPost] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPost("");
    if (post != "") {
      const postRef = doc(collection(firestore, "posts"));
      await setDoc(postRef, {
        content: post,
        username: user?.displayName,
        createdAt: serverTimestamp(),
        id: postRef.id,
      }).then(() => {
        setAlert(true);
        setAlertType("success");
        setMessage("Post added successfully.");
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      });
    } else {
      setAlert(true);
      setAlertType("danger");
      setMessage("You can't add empty post.");
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  };

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  return (
    <>
      {alert && (
        <div
          className={`flex items-center p-4 mb-4 border-t-4 ${
            alertType === "success"
              ? "border-green-500 bg-green-100"
              : "border-red-500 bg-red-100"
          }`}
        >
          <BsFillCheckCircleFill
            size={20}
            className={`${
              alertType === "success" ? "text-green-700" : "text-red-700"
            }`}
          />
          <div
            className={`ml-3 text-sm font-medium ${
              alertType === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </div>
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 ${
              alertType === "success"
                ? "text-green-500 focus:ring-green-400 bg-green-100 hover:bg-green-200"
                : "text-red-500 focus:ring-red-400 bg-red-100 hover:bg-red-200"
            }`}
            onClick={() => setAlert(false)}
          >
            <IoCloseSharp
              size={20}
              className={`${
                alertType === "success" ? "text-green-700" : "text-red-700"
              }`}
            />
          </button>
        </div>
      )}
      <div className="bg-white rounded border border-gray-300 px-5 py-3">
        <form onSubmit={handleSubmit} className="flex justify-between gap-6">
          <div className="flex items-center justify-center text-white uppercase text-xl w-10 h-10 rounded-full cursor-pointer bg-green-700">
            <div>{user?.displayName.charAt(0)}</div>
          </div>
          <input
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="bg-gray-200 rounded-2xl w-8/12 py-2 px-3 focus:ring-orange-500 focus:ring-1 outline-none"
            placeholder="what are you thinking about?"
          />
          <div>
            <button
              type="submit"
              className="flex items-center gap-2 transition-all duration-100 bg-orange-500 hover:bg-orange-600 rounded-lg p-3 text-white"
            >
              Post <IoSend />
            </button>
          </div>
        </form>
        <div className="flex justify-between mt-4 border-t border-gray-300 pt-3">
          <div className="flex items-center gap-4 cursor-pointer transition-all duration-100 hover:bg-gray-300 p-3 rounded">
            <FcCamcorderPro size={30} className="cursor-pointer" />
            <p className="text-gray-500 font-semibold text-md">Video</p>
          </div>
          <div className="flex items-center gap-4 cursor-pointer transition-all duration-100 hover:bg-gray-300 p-3 rounded">
            <FcImageFile size={30} className="cursor-pointer" />
            <p className="text-gray-500 font-semibold text-md">Image</p>
          </div>
          <div className="flex items-center gap-4 cursor-pointer transition-all duration-100 hover:bg-gray-300 p-3 rounded">
            <BsEmojiSunglasses
              size={30}
              className="text-amber-500 cursor-pointer"
            />
            <p className="text-gray-500 font-semibold text-md">Image</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPost;
