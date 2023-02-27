import React, { useState } from "react";

function PostItem() {
  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="w-[99%] bg-light-gray py-8 px-6 rounded-lg mb-5">
      <h1 className="text-2xl font-bold">Lecture Rescheduling</h1>
      <div className="flex items-center gap-4 justify-between mt-5 flex-wrap-reverse">
        <div className="flex items-center gap-4">
          <figure>
            <img
              className="w-12 rounded"
              src="https://lh3.googleusercontent.com/ogw/AAEL6sgatvoo8KDucDZZEhU56G4QKQOmBemOC_4F7ayyag=s32-c-mo"
              alt=""
            />
          </figure>
          <div>
            <p className="font-semibold">Elisabeth May</p>
            <span className="font-light text-gray-500 text-sm">6h Ago</span>
          </div>
        </div>
        <p className="px-2 py-1 rounded-lg bg-primary-blue text-white font-medium">
          CT244
        </p>
      </div>
      <p className="mt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptates
        quis illo exercitationem odio incidunt eaque commodi dolor neque, quod
        perferendis reprehenderit sint labore.
      </p>
      <div className="mt-5 flex gap-5 md:gap-3">
        <span
          className="bg-gray-500/5 cursor-pointer pt-1 px-1 rounded-lg "
          onClick={() => {
            setLoved(!loved);
          }}
        >
          <box-icon
            name="heart"
            type={loved ? "solid" : "regular"}
            color={loved ? "red" : "black"}
          ></box-icon>
        </span>
        <span
          className="bg-gray-500/5 cursor-pointer pt-1 px-1 rounded-lg"
          onClick={() => {
            setSaved(!saved);
          }}
        >
          <box-icon
            name="bookmark"
            type={saved ? "solid" : "regular"}
            // color={saved ? "yellow" : "black"}
          ></box-icon>
        </span>
        <span className="bg-gray-500/5 cursor-pointer py-1 px-1 rounded-lg flex items-center gap-2">
          <box-icon name="comment"></box-icon>
          <span className="text-ms leading-4">Add Respone</span>
        </span>
      </div>
    </div>
  );
}

export default PostItem;
