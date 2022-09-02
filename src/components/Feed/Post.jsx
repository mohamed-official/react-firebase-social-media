import moment from "moment";

const Post = ({ post }) => {
  return (
    <div className="bg-white rounded border border-gray-300 px-5 py-3">
      <div className="flex flex-col gap-2 border-b border-gray-300 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center text-white uppercase text-xl w-10 h-10 rounded-full cursor-pointer bg-green-700">
            <div>{post?.username.charAt(0)}</div>
          </div>
          <h6>{post?.username}</h6>
        </div>
        <span className="text-sm text-gray-500">
          {moment(post?.createdAt?.seconds * 1000).format(
            "YYYY/MM/DD hh:mm:ss"
          )}
        </span>
      </div>
      <p className="mt-3 text-base text-gray-700">{post?.content}</p>
    </div>
  );
};

export default Post;
